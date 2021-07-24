const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });

        console.log('Base de datos online');
    } catch (error) {   
        console.log(error);
        throw new Error('Error al levantar la base de datos ',error);
    }
}

module.exports = {
    dbConnection
}