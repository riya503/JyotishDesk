const express = require('express');
const router = express.Router();
const followupController = require('../controllers/followupController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', followupController.getFollowups);
router.post('/', followupController.createFollowup);
router.put('/:id', followupController.updateFollowup);
router.delete('/:id', followupController.deleteFollowup);
router.post('/:id/send-reminder', followupController.sendReminderEmail);

module.exports = router;
