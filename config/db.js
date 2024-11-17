const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb+srv://Cluster95194:Lavleen@cluster95194.fiw1c.mongodb.net/food_delivery_db', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
};

const closeDB = async () => {
    mongoose.connection.close();
};

module.exports = connectDB;
