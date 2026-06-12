const { getDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class ClientRepository {
  async findAll(astrologerId) {
    const db = await getDb();
    // Allow seeing global mock records (astrologerId is null/empty string) OR records scoped to this astrologer
    return await db.all('SELECT * FROM clients WHERE astrologerId = ? OR astrologerId IS NULL OR astrologerId = ""', astrologerId);
  }

  async findById(id, astrologerId) {
    const db = await getDb();
    return await db.get('SELECT * FROM clients WHERE id = ? AND (astrologerId = ? OR astrologerId IS NULL OR astrologerId = "")', [id, astrologerId]);
  }

  async create(clientData, astrologerId) {
    const db = await getDb();
    const newClient = {
      id: uuidv4(),
      astrologerId,
      name: clientData.name,
      phone: clientData.phone,
      email: clientData.email,
      dob: clientData.dob,
      tob: clientData.tob,
      pob: clientData.pob,
      problemCategory: clientData.problemCategory,
      createdAt: new Date().toISOString()
    };
    
    await db.run(
      `INSERT INTO clients (id, astrologerId, name, phone, email, dob, tob, pob, problemCategory, createdAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newClient.id, newClient.astrologerId, newClient.name, newClient.phone, newClient.email, newClient.dob, newClient.tob, newClient.pob, newClient.problemCategory, newClient.createdAt]
    );
    
    return newClient;
  }

  async update(id, clientData, astrologerId) {
    const db = await getDb();
    const existingClient = await this.findById(id, astrologerId);
    if (!existingClient) return null;

    const updatedClient = {
      ...existingClient,
      name: clientData.name || existingClient.name,
      phone: clientData.phone || existingClient.phone,
      email: clientData.email || existingClient.email,
      dob: clientData.dob || existingClient.dob,
      tob: clientData.tob || existingClient.tob,
      pob: clientData.pob || existingClient.pob,
      problemCategory: clientData.problemCategory || existingClient.problemCategory
    };

    await db.run(
      `UPDATE clients SET name = ?, phone = ?, email = ?, dob = ?, tob = ?, pob = ?, problemCategory = ? WHERE id = ?`,
      [updatedClient.name, updatedClient.phone, updatedClient.email, updatedClient.dob, updatedClient.tob, updatedClient.pob, updatedClient.problemCategory, id]
    );

    return updatedClient;
  }

  async delete(id, astrologerId) {
    const db = await getDb();
    const existingClient = await this.findById(id, astrologerId);
    if (!existingClient) return false;

    await db.run('DELETE FROM clients WHERE id = ?', id);
    return true;
  }
}

module.exports = new ClientRepository();
