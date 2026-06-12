const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const followupRoutes = require('./routes/followupRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mounting REST endpoints
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/followups', followupRoutes);
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'JyotishDesk Astrologer CRM API is fully configured.' });
});

// Error handling fallback middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong inside the server' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
