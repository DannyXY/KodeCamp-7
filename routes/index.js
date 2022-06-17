var express = require('express');
var router = express.Router();
const { getCurrentLocation } = require('../middleware/getDistance')
const { deleteLocation, editLocation, fetchAllLocations, addLocation , getDistance , getSingleLocation} = require('../controller/location')


router.get('/location/:id', getCurrentLocation, getDistance)
router.route('/').get(fetchAllLocations)
                 .post( addLocation )
router.route('/:id').get(getSingleLocation)
                    .put( editLocation )
                    .delete(deleteLocation)

module.exports = router;
