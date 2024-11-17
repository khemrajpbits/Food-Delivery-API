const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
};

const closeDB = async () => {
    mongoose.connection.close();
};

module.exports = connectDB;
