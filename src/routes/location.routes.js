const express = require('express');
const locationController = require('../controllers/location.controller');

const router = express.Router();

router.route('/init').get(locationController.init);
router
    .route('/')
    .get(locationController.getAllPoints)
    .post(locationController.postPoint);

router.get('/close',locationController.findClose);
router.post('/distance',locationController.findDistance);

module.exports = router;
