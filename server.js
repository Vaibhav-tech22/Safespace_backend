const app = require('./app')

const dotenv = require('dotenv')
// const connectDataBase = require("./config/dataBase.js")

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: , ${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`);
    process.exit(1);
})

//config file
dotenv.config({path:"config/config.env"});

//Calling the function to connect the database
// connectDataBase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`The server has started at http://localhost/${process.env.PORT}`);
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: , ${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
})