const Location = require('../models/location.model');
const dummyLocations = require('../../data/simpledata.json');
const { giveDistance } = require('../util/helperFunctions');

exports.findClose = async (req, res) => {
    const { targetLongitude, targetLatitude, limit } = req.query;

    console.log(req.query);
    try {
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
        console.log(result);

        return res.status(200).json({
            status: 'OK',
            body: {
                currentPoint,
                closestpoints: result,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

exports.findDistance = async (req, res) => {
    const { point1, point2 } = req.body;
    // Distance in kilometers
    distance = giveDistance(point1, point2)
    
    res.status(200).json({
        status: 'OK',
        body: {
            point1,
            point2,
            distance,
            unit: 'KM',
        },
    });
};

exports.getAllPoints = async (req, res) => {
    const data = await Location.find();

    return res.status(200).json({
        status: 'OK',
        length: data.length,
        data,
    });
};

exports.postPoint = async (req, res) => {
    const data = await Location.create(req.body);

    return res.status(200).json({
        status: 'OK',
        data,
    });
};

exports.init = async (req, res) => {
    const data = await Location.insertMany(dummyLocations);
    return res.status(200).json({
        status: 'OK',
        length: data.length,
        data,
    });
};
