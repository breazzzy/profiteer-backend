module.exports = (sequeilize, DataTypes) => {
  const User = sequeilize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "User",
    }
  );
  return User;
};
