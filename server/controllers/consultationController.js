const consultationRepository = require('../repositories/consultationRepository');
const clientRepository = require('../repositories/clientRepository');
const emailService = require('../services/emailService');class ConsultationController {
  async getConsultations(req, res) {
    try {
      const consultations = await consultationRepository.findAll(req.user.id);
      res.json(consultations);
    } catch (error) {
      console.error('getConsultations error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async getConsultationsByClient(req, res) {
    try {
      const consultations = await consultationRepository.findByClientId(req.params.clientId, req.user.id);
      res.json(consultations);
    } catch (error) {
      console.error('getConsultationsByClient error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async createConsultation(req, res) {
    try {
      const conData = req.body;
      if (!conData.clientId || !conData.category || !conData.notes) {
        return res.status(400).json({ error: 'Missing required consultation fields.' });
      }

      // Use Gemini to generate AI Summary
      if (!conData.aiSummary) {
        try {
          const aiService = require('../services/aiService');
          conData.aiSummary = await aiService.generateConsultationSummary(conData.notes);
        } catch (error) {
          console.error('Error with AI summary generation:', error);
          conData.aiSummary = `[Fallback AI Summary] Consultation logged. Analysis failed.`;
        }
      }

      const newCon = await consultationRepository.create(conData, req.user.id);
      res.status(201).json(newCon);
    } catch (error) {
      console.error('createConsultation error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async updateConsultation(req, res) {
    try {
      const updatedCon = await consultationRepository.update(req.params.id, req.body, req.user.id);
      if (!updatedCon) {
        return res.status(404).json({ error: 'Consultation not found or unauthorized.' });
      }
      res.json(updatedCon);
    } catch (error) {
      console.error('updateConsultation error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async updateRemedyStatus(req, res) {
    try {
      const { id, remedyId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required.' });
      }

      const con = await consultationRepository.findById(id, req.user.id);
      if (!con) {
        return res.status(404).json({ error: 'Consultation not found or unauthorized.' });
      }

      const remedies = con.remedies.map(rem => {
        if (rem.id === remedyId) {
          return { ...rem, status };
        }
        return rem;
      });

      const updatedCon = await consultationRepository.update(id, { remedies }, req.user.id);
      res.json(updatedCon);
    } catch (error) {
      console.error('updateRemedyStatus error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async deleteConsultation(req, res) {
    try {
      const success = await consultationRepository.delete(req.params.id, req.user.id);
      if (!success) {
        return res.status(404).json({ error: 'Consultation not found or unauthorized.' });
      }
      res.json({ message: 'Consultation deleted successfully.' });
    } catch (error) {
      console.error('deleteConsultation error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async sendSummaryEmail(req, res) {
    try {
      const con = await consultationRepository.findById(req.params.id, req.user.id);
      if (!con) return res.status(404).json({ error: 'Consultation not found.' });

      const client = await clientRepository.findById(con.clientId, req.user.id);
      if (!client) return res.status(404).json({ error: 'Client not found.' });
      
      if (!client.email) {
        return res.status(400).json({ error: 'Client has no email address.' });
      }

      await emailService.sendConsultationSummary(client.email, client.name, con.aiSummary || 'No summary available.');
      res.json({ message: 'Email sent successfully.' });
    } catch (error) {
      console.error('sendSummaryEmail error:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    }
  }
}

module.exports = new ConsultationController();
