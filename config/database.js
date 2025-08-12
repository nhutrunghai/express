const mongoose = require("mongoose")
module.exports.connect = async() => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('Connect Database Done')
    } catch (error) {
        console.log('Connect Database Error !!!');
    }
}

