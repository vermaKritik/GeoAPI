const Location = require('../models/location.model');
const handlerFactory = require('../services/handlerFactory.service');
const catchAsync = require('../utils/chtchasync');
const dummyLocations = require('../../data/simpledata.json');
const dummyLocationsLarge = require('../../data/data.json');
const { giveDistance } = require('../services/location.service');
const AppError = require('../utils/appError');

exports.findClose = catchAsync(async (req, res, next) => {
    const { targetLongitude, targetLatitude, limit } = req.query;
    const mainLimit = parseInt(limit, 10) + 1;

    console.log('mainLimit', mainLimit);

    const result = await Location.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [
                        parseFloat(targetLongitude, 10),
                        parseFloat(targetLatitude, 10),
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
            $limit: mainLimit,
        },
    ]);

    console.log(
        'result len',
        result[0].location.coordinates[0] === parseFloat(targetLongitude, 10) &&
            result[0].location.coordinates[1] === parseFloat(targetLatitude, 10)
    );
    let currentPoint;
    if (result.length > 0) {
        if (
            result[0].location.coordinates[0] ===
                parseFloat(targetLongitude, 10) &&
            result[0].location.coordinates[1] === parseFloat(targetLatitude, 10)
        ) {
            currentPoint = result[0];
            result.shift();
        } else {
            currentPoint = {
                name: 'unKnowun',
                location: {
                    type: 'Point',
                    coordinates: [
                        parseFloat(targetLongitude, 10),
                        parseFloat(targetLatitude, 10),
                    ],
                },
            };
        }
    } else {
        return next(new AppError('Something went wrong', 400));
    }

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
    const data = await handlerFactory.getAll(Location, req.query);

    return res.status(200).json({
        status: 'OK',
        length: data.length,
        data,
    });
});

exports.postPoint = catchAsync(async (req, res) => {
    const data = await handlerFactory.createOne(Location, req.body);

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
