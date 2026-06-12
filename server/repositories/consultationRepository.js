const { getDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class ConsultationRepository {
  async findAll(astrologerId) {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM consultations WHERE astrologerId = ? OR astrologerId IS NULL OR astrologerId = ""', astrologerId);
    return rows.map(r => ({ ...r, remedies: JSON.parse(r.remedies || '[]') }));
  }

  async findByClientId(clientId, astrologerId) {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM consultations WHERE clientId = ? AND (astrologerId = ? OR astrologerId IS NULL OR astrologerId = "")', [clientId, astrologerId]);
    return rows.map(r => ({ ...r, remedies: JSON.parse(r.remedies || '[]') }));
  }

  async findById(id, astrologerId) {
    const db = await getDb();
    const row = await db.get('SELECT * FROM consultations WHERE id = ? AND (astrologerId = ? OR astrologerId IS NULL OR astrologerId = "")', [id, astrologerId]);
    if (row) {
      row.remedies = JSON.parse(row.remedies || '[]');
    }
    return row;
  }

  async create(conData, astrologerId) {
    const db = await getDb();
    const newCon = {
      id: uuidv4(),
      clientId: conData.clientId,
      clientName: conData.clientName,
      astrologerId,
      date: new Date().toISOString(),
      category: conData.category,
      notes: conData.notes,
      aiSummary: conData.aiSummary || '',
      status: conData.status || 'Completed',
      remedies: conData.remedies || [],
      createdAt: new Date().toISOString()
    };
    
    await db.run(
      `INSERT INTO consultations (id, clientId, clientName, astrologerId, date, category, notes, aiSummary, status, remedies, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newCon.id, newCon.clientId, newCon.clientName, newCon.astrologerId, newCon.date, newCon.category, newCon.notes, newCon.aiSummary, newCon.status, JSON.stringify(newCon.remedies), newCon.createdAt]
    );
    
    return newCon;
  }

  async update(id, conData, astrologerId) {
    const db = await getDb();
    const existingCon = await this.findById(id, astrologerId);
    if (!existingCon) return null;

    const updatedCon = {
      ...existingCon,
      category: conData.category || existingCon.category,
      notes: conData.notes || existingCon.notes,
      aiSummary: conData.aiSummary || existingCon.aiSummary,
      status: conData.status || existingCon.status,
      remedies: conData.remedies || existingCon.remedies
    };

    await db.run(
      `UPDATE consultations SET category = ?, notes = ?, aiSummary = ?, status = ?, remedies = ? WHERE id = ?`,
      [updatedCon.category, updatedCon.notes, updatedCon.aiSummary, updatedCon.status, JSON.stringify(updatedCon.remedies), id]
    );

    return updatedCon;
  }

  async delete(id, astrologerId) {
    const db = await getDb();
    const existingCon = await this.findById(id, astrologerId);
    if (!existingCon) return false;

    await db.run('DELETE FROM consultations WHERE id = ?', id);
    return true;
  }
}

module.exports = new ConsultationRepository();
