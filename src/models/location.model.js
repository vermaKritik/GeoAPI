const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
                index: '2dsphere',
            },
        },
    },
    {
        timestamps: true,
    }
);

locationSchema.index({ 'location.coordinates': '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
