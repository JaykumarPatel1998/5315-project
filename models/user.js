import mongoose, {Schema } from "mongoose";

//user schema
const userSchema = new Schema({
    username :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
    virtuals : {
        userinfo : {
            get() {
                return `username : ${this.username}, email: ${this.email}` 
            }
        }
    }
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel