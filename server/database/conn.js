require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery",false);

mongoose.connect(process.env.DATABASE_CON , {useNewUrlParser : true})

const db = mongoose.connection;

db.on("error" , (error) => console.log(error))
db.once("open" , () => console.log("DB connection is opened"))