const clientRepository = require('../repositories/clientRepository');
const consultationRepository = require('../repositories/consultationRepository');
const followupRepository = require('../repositories/followupRepository');
const aiService = require('../services/aiService');

class AIController {
  async getDashboardMetrics(req, res) {
    try {
      const userId = req.user.id;

      const clients = await clientRepository.findAll(userId);
      const consultations = await consultationRepository.findAll(userId);
      const followups = await followupRepository.findAll(userId);

      // Compute statistics dynamically
      const totalClients = clients.length;
      const totalConsultations = consultations.length;
      const pendingFollowups = followups.filter(f => f.status === 'Pending').length;
      
      const todayStr = new Date().toISOString().split('T')[0];
      const todaysFollowups = followups.filter(f => f.status === 'Pending' && f.dueDate === todayStr).length;

      // Compute Categories Split
      const categoriesMap = {
        Career: 0,
        Marriage: 0,
        Finance: 0,
        Health: 0,
        Education: 0,
        Other: 0
      };

      consultations.forEach(con => {
        if (categoriesMap[con.category] !== undefined) {
          categoriesMap[con.category]++;
        } else {
          categoriesMap.Other = (categoriesMap.Other || 0) + 1;
        }
      });

      const categoryStats = Object.keys(categoriesMap).map(key => ({
        name: key,
        value: categoriesMap[key]
      }));

      // Sort categoryStats by value descending
      categoryStats.sort((a, b) => b.value - a.value);

      // Simple activity log mock generator
      const recentActivities = [
        { id: "a1", action: "Dashboard Reloaded", target: "System Checked", time: "Just now" }
      ];

      if (clients.length > 0) {
        recentActivities.push({
          id: "a2",
          action: "Latest Client",
          target: clients[clients.length - 1].name,
          time: "Recently added"
        });
      }
      if (consultations.length > 0) {
        recentActivities.push({
          id: "a3",
          action: "Latest Session",
          target: `${consultations[consultations.length - 1].clientName} (${consultations[consultations.length - 1].category})`,
          time: "Recently completed"
        });
      }

      // Fetch dynamic insights from AI Service
      const metricsForAi = {
        totalClients,
        totalConsultations,
        pendingFollowups,
        todaysFollowups,
        categoryStats
      };

      const aiInsights = await aiService.generateDashboardInsights(metricsForAi);

      res.json({
        totalClients,
        totalConsultations,
        pendingFollowups,
        todaysFollowups,
        categoryStats,
        recentActivities,
        aiInsights
      });
    } catch (error) {
      console.error('getDashboardMetrics error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async getClientInsights(req, res) {
    try {
      const clientId = req.params.id;
      const userId = req.user.id;

      const client = await clientRepository.findById(clientId, userId);
      if (!client) {
        return res.status(404).json({ error: 'Client not found.' });
      }

      // Generate dynamic insights using AI Service
      const insights = await aiService.generateClientInsights(client);

      res.json(insights);
    } catch (error) {
      console.error('getClientInsights error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async generateFollowupMessage(req, res) {
    try {
      const { clientId } = req.body;
      if (!clientId) {
        return res.status(400).json({ error: 'Client ID is required.' });
      }

      const client = await clientRepository.findById(clientId, req.user.id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found.' });
      }

      const consultations = await consultationRepository.findByClientId(clientId, req.user.id);
      
      const aiMessage = await aiService.generateFollowupMessage(client, consultations);

      res.json({ message: aiMessage });
    } catch (error) {
      console.error('generateFollowupMessage error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

module.exports = new AIController();
