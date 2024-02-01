const Location = require('../models/location.model');
const catchAsync = require('../utils/chtchasync');
const dummyLocations = require('../../data/simpledata.json');
const dummyLocationsLarge = require('../../data/data.json');
const { giveDistance } = require('../services/location.service');

exports.findClose = catchAsync(async (req, res) => {
    const { targetLongitude, targetLatitude, limit } = req.query;

    const result = await Location.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [
                        parseInt(targetLongitude, 10),
                        parseInt(targetLatitude, 10),
                    ],
                },
                key: 'location.coordinates',
                distanceField: 'distance',
                spherical: true,
                query: {},
            },
        },
        {
            $sort: {
                distance: 1,
            },
        },
        {
            $limit: parseInt(limit, 10) + 1,
        },
    ]);

    const currentPoint = result[0];
    result.shift();

    return res.status(200).json({
        status: 'OK',
        body: {
            currentPoint,
            closestpoints: result,
        },
    });
});

exports.findDistance = catchAsync(async (req, res) => {
    const { point1, point2 } = req.body;

    // Distance in kilometers
    distance = giveDistance(point1, point2);

    res.status(200).json({
        status: 'OK',
        body: {
            point1,
            point2,
            distance,
            unit: 'KM',
        },
    });
});

exports.getAllPoints = catchAsync(async (req, res) => {
    const data = await Location.find();

    return res.status(200).json({
        status: 'OK',
        length: data.length,
        data,
    });
});

exports.postPoint = catchAsync(async (req, res) => {
    const data = await Location.create(req.body);

    return res.status(200).json({
        status: 'OK',
        data,
    });
});

exports.init = catchAsync(async (req, res) => {
    const { data } = req.query;
    let dataSet;
    
    if (data === 'large') {
        dataSet = await Location.insertMany(dummyLocationsLarge);
    } else {
        dataSet = await Location.insertMany(dummyLocations);
    }

    return res.status(200).json({
        status: 'OK',
        length: dataSet.length,
        dataSet,
    });
});
