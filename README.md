# profiteer backend

Backend for profiteer website written with nodeJS and express.

### File Layout
- Config - config file
- Controllers - JS files holding functions for routes.
- Models - index.js creates the database, each "model".js holds the model for database entries.
- Policies - isAuthenticaed.js is used to authenticate users using JWT
### Modules Used
- crypto-js - Used to encrypt passwords in database.
- Express
- jsonwebtoken - Used for authentication system, assures that a user needs to be logged in and authenticated in order to see or edit sensitive information. Essentially makes it so you cant commit buys/sells by just using somebody's username.
- passport and passport-jwt - passport reads the Json Web Token given to us and assures that its valid. The strategy used in this project is the most simple one covered in their documentation. -> [Doc here](http://www.passportjs.org/packages/passport-jwt/)
- sqlite and sequelize - Project uses sqlite database. Sequelize is used to read and edit the database.
- yahoo-finance2 - API used to get stock data.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
