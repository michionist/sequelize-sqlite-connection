const Sequelize = require("sequelize");
const express = require("express");
const _USER = require("./user.json");

const app = express();
const port = 8100;

// Connect to Sqlite DB
const connection = new Sequelize('db', 'user', 'pass', {
    host: "localhost",
    dialect: "sqlite",
    storage: "db.sqlite",
    operatorAliases: false,
    define: {
        freezeTableName: true
    }
});

const User = connection.define("User", {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                isAlphanumeric: true
            }
        }
    }
});

connection
    .sync({
    })
    .then(() => {
        User.bulkCreate(_USER)
            .then(users => {
                console.log("Success adding users");
            })
            .catch(err => console.log(err))
    })
    .then(() => console.log("Connection Succeeded!"))
    .catch((err) => console.log(`Connection failed: ${err}`));


app.get("/", (req, res) => {
    User.create({
            name: "bo",
            bio: "Invented the internet"
        })
        .then(user => console.log(user))
        .catch(err => {
            res.status(404).json(err);
            console.log(err);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});