const { getDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class FollowupRepository {
  async findAll(astrologerId) {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM followups WHERE astrologerId = ? OR astrologerId IS NULL OR astrologerId = ""', astrologerId);
    return rows.map(r => ({ ...r, emailSent: !!r.emailSent }));
  }

  async findByClientId(clientId, astrologerId) {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM followups WHERE clientId = ? AND (astrologerId = ? OR astrologerId IS NULL OR astrologerId = "")', [clientId, astrologerId]);
    return rows.map(r => ({ ...r, emailSent: !!r.emailSent }));
  }

  async findById(id, astrologerId) {
    const db = await getDb();
    const row = await db.get('SELECT * FROM followups WHERE id = ? AND (astrologerId = ? OR astrologerId IS NULL OR astrologerId = "")', [id, astrologerId]);
    if (row) {
      row.emailSent = !!row.emailSent;
    }
    return row;
  }

  async create(followupData, astrologerId) {
    const db = await getDb();
    const newFollowup = {
      id: uuidv4(),
      clientId: followupData.clientId,
      clientName: followupData.clientName,
      consultationId: followupData.consultationId,
      astrologerId,
      dueDate: followupData.dueDate,
      status: followupData.status || 'Pending',
      aiMessage: followupData.aiMessage || '',
      emailSent: false,
      createdAt: new Date().toISOString()
    };
    
    await db.run(
      `INSERT INTO followups (id, clientId, clientName, consultationId, astrologerId, dueDate, status, aiMessage, emailSent, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newFollowup.id, newFollowup.clientId, newFollowup.clientName, newFollowup.consultationId, newFollowup.astrologerId, newFollowup.dueDate, newFollowup.status, newFollowup.aiMessage, newFollowup.emailSent ? 1 : 0, newFollowup.createdAt]
    );
    
    return newFollowup;
  }

  async update(id, followupData, astrologerId) {
    const db = await getDb();
    const existingFollowup = await this.findById(id, astrologerId);
    if (!existingFollowup) return null;

    const updatedFollowup = {
      ...existingFollowup,
      dueDate: followupData.dueDate || existingFollowup.dueDate,
      status: followupData.status || existingFollowup.status,
      aiMessage: followupData.aiMessage || existingFollowup.aiMessage,
      emailSent: followupData.emailSent !== undefined ? followupData.emailSent : existingFollowup.emailSent
    };

    await db.run(
      `UPDATE followups SET dueDate = ?, status = ?, aiMessage = ?, emailSent = ? WHERE id = ?`,
      [updatedFollowup.dueDate, updatedFollowup.status, updatedFollowup.aiMessage, updatedFollowup.emailSent ? 1 : 0, id]
    );

    return updatedFollowup;
  }

  async delete(id, astrologerId) {
    const db = await getDb();
    const existingFollowup = await this.findById(id, astrologerId);
    if (!existingFollowup) return false;

    await db.run('DELETE FROM followups WHERE id = ?', id);
    return true;
  }
}

module.exports = new FollowupRepository();
