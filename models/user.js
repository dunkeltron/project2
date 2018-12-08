module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }, userName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
        validate: {
          len: [1]
        }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Shows, {
      onDelete: "cascade"
    });
  };
  return User;
};
