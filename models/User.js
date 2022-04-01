module.exports = (sequeilize, DataTypes) => {
  const User = sequeilize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true, //Must be unique nobody can have the same username as someone else
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      modelName: "User",
    }
  );

  return User;
};
