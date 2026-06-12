const { getDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class UserRepository {
  async findByEmail(email) {
    const db = await getDb();
    return await db.get('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', email);
  }

  async findById(id) {
    const db = await getDb();
    return await db.get('SELECT * FROM users WHERE id = ?', id);
  }

  async create(userData) {
    const db = await getDb();
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    
    await db.run(
      'INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)',
      [newUser.id, newUser.name, newUser.email, newUser.password, newUser.createdAt]
    );
    
    return newUser;
  }
}

module.exports = new UserRepository();
