module.exports = function (sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    photoLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  return Photo;
};
