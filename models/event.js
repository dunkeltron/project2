module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define("Event", {
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
