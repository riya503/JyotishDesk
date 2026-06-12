const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/dashboard', aiController.getDashboardMetrics);
router.get('/client/:id', aiController.getClientInsights);
router.post('/generate-followup', aiController.generateFollowupMessage);

module.exports = router;
