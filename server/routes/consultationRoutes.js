const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', consultationController.getConsultations);
router.get('/client/:clientId', consultationController.getConsultationsByClient);
router.post('/', consultationController.createConsultation);
router.put('/:id', consultationController.updateConsultation);
router.put('/:id/remedy/:remedyId', consultationController.updateRemedyStatus);
router.delete('/:id', consultationController.deleteConsultation);
router.post('/:id/send-summary', consultationController.sendSummaryEmail);

module.exports = router;
