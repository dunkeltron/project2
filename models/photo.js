module.exports = function (sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventId: {
      type: Datatypes.STRING,
      allowNull: false
    },
    photoName: {
      type: Datatypes.STRING,
      allowNull: false
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