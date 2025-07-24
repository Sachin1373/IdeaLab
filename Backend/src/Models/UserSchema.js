import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true
    },
    googleId : {
        type : String,
    },

})

const User = mongoose.model("User",UserSchema)

export default User