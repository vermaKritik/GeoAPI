const express = require('express');
const locationController = require('../controllers/location.controller');

const router = express.Router();

router.route('/init').get(locationController.init);
router
    .route('/locations')
    .get(locationController.getAllPoints)
    .post(locationController.postPoint);

router.get('/locations/close',locationController.findClose);
router.post('/locations/distance',locationController.findDistance);

module.exports = router;
