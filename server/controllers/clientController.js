const clientRepository = require('../repositories/clientRepository');

class ClientController {
  async getClients(req, res) {
    try {
      const clients = await clientRepository.findAll(req.user.id);
      res.json(clients);
    } catch (error) {
      console.error('getClients error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async getClientById(req, res) {
    try {
      const client = await clientRepository.findById(req.params.id, req.user.id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found.' });
      }
      res.json(client);
    } catch (error) {
      console.error('getClientById error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async createClient(req, res) {
    try {
      const clientData = req.body;
      if (!clientData.name || !clientData.dob || !clientData.tob || !clientData.pob) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
      const newClient = await clientRepository.create(clientData, req.user.id);
      res.status(201).json(newClient);
    } catch (error) {
      console.error('createClient error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async updateClient(req, res) {
    try {
      const updatedClient = await clientRepository.update(req.params.id, req.body, req.user.id);
      if (!updatedClient) {
        return res.status(404).json({ error: 'Client not found or unauthorized.' });
      }
      res.json(updatedClient);
    } catch (error) {
      console.error('updateClient error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async deleteClient(req, res) {
    try {
      const success = await clientRepository.delete(req.params.id, req.user.id);
      if (!success) {
        return res.status(404).json({ error: 'Client not found or unauthorized.' });
      }
      res.json({ message: 'Client deleted successfully.' });
    } catch (error) {
      console.error('deleteClient error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

module.exports = new ClientController();
