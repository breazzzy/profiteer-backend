module.exports = (sequeilize, DataTypes) => {
  const Sell = sequeilize.define(
    "Sell",
    {
      stockTicker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceAtSell: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      priceAtBuy: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amountSold: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      modelName: "Sell",
    }
  );
  return Sell;
};
