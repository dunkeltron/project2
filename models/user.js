module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }, userName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Shows, {
      onDelete: "cascade"
    });
  };
  return User;
};
