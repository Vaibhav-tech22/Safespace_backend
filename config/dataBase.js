const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then((data) => {
        console.log(`MongoDB Database connected with HOST: ${data.connection.host}`);
    })
}

module.exports = connectDataBase;