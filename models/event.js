module.exports = function (sequelize, DataTypes) {
    var Shows = sequelize.define("Shows", {
        eventName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventVenue: {
            type: DataTypes.STRING,
            allowNull: false
        },eventId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    });
    Shows.associate = (models) => {
        Shows.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
          }
        });
    };
    return Shows;
}
