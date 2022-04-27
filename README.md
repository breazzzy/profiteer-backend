# profiteer backend

Backend for profiteer website written with nodeJS and express.

File Layout
- Config - config file
- Controllers - JS files holding functions for routes.
- Models - index.js creates the database, each "model".js holds the model for database entries.
- Policies - isAuthenticaed.js is used to authenticate users using JWT
Modules Used


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
