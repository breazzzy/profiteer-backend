module.exports = (sequeilize, DataTypes) => {
  const Watch = sequeilize.define(
    "Watch",
    {
      stockTicker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "Watch",
    }
  );
  return Watch;
};
