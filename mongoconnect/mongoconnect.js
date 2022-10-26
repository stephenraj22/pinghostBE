const mongoose = require('mongoose')
mongoConnect = () =>{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        dbName:'pinghost'
    },
        err => {
            if (!err) {
                console.log("Connected to mongodb");
            } else {
                console.log(err);
            }
        }
    )
} 
module.exports = mongoConnect