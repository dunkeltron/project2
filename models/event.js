module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventVenue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Event;
}
