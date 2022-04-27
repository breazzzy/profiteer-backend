//Model for watch data entry.
module.exports = (sequeilize, DataTypes) => {
  const Watch = sequeilize.define(
    "Watch",
    {
      stockTicker: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "watchComposite",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "watchComposite",
      },
    },
    {
      modelName: "Watch",
    }
  );
  return Watch;
};
