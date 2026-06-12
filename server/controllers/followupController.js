const followupRepository = require('../repositories/followupRepository');
const clientRepository = require('../repositories/clientRepository');
const emailService = require('../services/emailService');
class FollowupController {
  async getFollowups(req, res) {
    try {
      const followups = await followupRepository.findAll(req.user.id);
      res.json(followups);
    } catch (error) {
      console.error('getFollowups error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async createFollowup(req, res) {
    try {
      const fData = req.body;
      if (!fData.clientId || !fData.clientName || !fData.dueDate) {
        return res.status(400).json({ error: 'Missing required follow-up fields.' });
      }

      // Generate a nice mock AI Message if not provided
      if (!fData.aiMessage) {
        fData.aiMessage = `Namaste ${fData.clientName} Ji, hope you are doing well. This is a follow-up check-in from Pandit Shastri regarding your remedies. Please share your progress at your earliest convenience.`;
      }

      const newFollowup = await followupRepository.create(fData, req.user.id);
      res.status(201).json(newFollowup);
    } catch (error) {
      console.error('createFollowup error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async updateFollowup(req, res) {
    try {
      const updatedF = await followupRepository.update(req.params.id, req.body, req.user.id);
      if (!updatedF) {
        return res.status(404).json({ error: 'Follow-up check not found or unauthorized.' });
      }
      res.json(updatedF);
    } catch (error) {
      console.error('updateFollowup error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async deleteFollowup(req, res) {
    try {
      const success = await followupRepository.delete(req.params.id, req.user.id);
      if (!success) {
        return res.status(404).json({ error: 'Follow-up check not found or unauthorized.' });
      }
      res.json({ message: 'Follow-up deleted successfully.' });
    } catch (error) {
      console.error('deleteFollowup error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async sendReminderEmail(req, res) {
    try {
      const f = await followupRepository.findById(req.params.id, req.user.id);
      if (!f) return res.status(404).json({ error: 'Followup not found.' });

      const client = await clientRepository.findById(f.clientId, req.user.id);
      if (!client) return res.status(404).json({ error: 'Client not found.' });

      if (!client.email) {
        return res.status(400).json({ error: 'Client has no email address.' });
      }

      await emailService.sendFollowupReminder(client.email, client.name);
      
      // Update follow-up status to mark email sent
      await followupRepository.update(req.params.id, { emailSent: true }, req.user.id);
      
      res.json({ message: 'Email sent successfully.' });
    } catch (error) {
      console.error('sendReminderEmail error:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  }
}

module.exports = new FollowupController();
