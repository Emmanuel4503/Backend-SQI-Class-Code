const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is important jor!"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        // unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken:{
        type:String
    },
    verificationExp: {
        type: String
    }
})


const userModel = mongoose.model('user', userSchema)

module.exports = userModel