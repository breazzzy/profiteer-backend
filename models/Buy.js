// Model for user buy entries
module.exports = (sequeilize, DataTypes) => {
  const Buy = sequeilize.define(
    "Buy",
    {
      stockTicker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priceAtBuy: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amountBought: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      modelName: "Buy",
    }
  );
  return Buy;
};
