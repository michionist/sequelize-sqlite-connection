const Sequelize = require("sequelize");
const express = require("express");

const app = express();
const port = 8100;

// Connect to Sqlite DB
const connection = new Sequelize('db', 'user', 'pass', {
    host: "localhost",
    dialect: "sqlite",
    storage: "db.sqlite",
    operatorAliases: false,
});

connection
    .authenticate()
    .then(() => console.log("Connection Succeeded!"))
    .catch((err) => console.log(`Connection failed: ${err}`));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});