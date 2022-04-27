// Config
module.exports = {
  port: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || "profiteer",
    user: process.env.DB_USER || "profiteer",
    password: process.env.DB_PASS || "profiteer",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: "./profiteer.sqlite",
    },
  },
  yfin: {
    validation: false,
  },
  authentication: {
    jwtKey: "JWTKEYFORPROFITEER",
  },
};
