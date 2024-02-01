const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

exports.giveDistance = (point1, point2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLon = toRadians(point2.longitude - point1.longitude);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(point1.latitude)) *
            Math.cos(toRadians(point2.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
};


