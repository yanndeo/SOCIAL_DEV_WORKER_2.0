const mongoose = require('mongoose');
const config = require('config');
const db = config.get("mongoURI");



const connectDB = async()=>{;

    try {

        await mongoose.connect(db, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        });

        console.log('>>>>>>>>>>>>>>>>> Database connected')
        
    } catch (error) {

        console.error('err-database', error.message)
        process.exit(1) //Exit process with failure
    }
}

module.exports = connectDB
