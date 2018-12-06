module.exports = function (sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    photoLink:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Photo;
};