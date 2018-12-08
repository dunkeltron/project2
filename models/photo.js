module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    photoId:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    photoLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventFk: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  return Photo;
};
