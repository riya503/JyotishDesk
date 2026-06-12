const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'humara_pandit_astrologer_crm_super_secret_key';

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please enter all fields.' });
      }

      // Check existing user
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = await userRepository.create({
        name,
        email,
        password: hashedPassword
      });

      // Sign Token
      const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Please enter all fields.' });
      }

      // Find user
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      // Sign Token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  async verifyToken(req, res) {
    try {
      const user = await userRepository.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

module.exports = new AuthController();
