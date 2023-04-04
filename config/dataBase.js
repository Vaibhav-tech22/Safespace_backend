const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
}

module.exports = connectDataBase;