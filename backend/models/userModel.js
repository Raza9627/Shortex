import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
 Name:{type:String,required:true},
 Email:{type:String,required:true,unique:true},
 Password:{type:String,required:true},
 resetPasswordToken:{type:String},
 resetPasswordExpires:{type:Date}
},
{timestamps:true}
)
const User= mongoose.model("User",userSchema)

export default User