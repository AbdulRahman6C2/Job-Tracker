const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/applicationController');

router.get('/', ctrl.listApplications);
router.post('/', ctrl.createApplication);
router.put('/:id', ctrl.updateApplication);
router.delete('/:id', ctrl.deleteApplication);

module.exports = router;