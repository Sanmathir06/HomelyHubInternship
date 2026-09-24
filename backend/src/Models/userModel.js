//user schema

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto"
import { bytes } from "node:stream/consumers";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter your name"],
            //"      john      "
            trim:true,
            max_length:[50,"Your name cannot be longer than 50 characters"]
        },
        email:{
            type:String,
            required:[true,"Please enter your email ID"],
            unique:true,
            lowercase:true,
            trim:true,
            validate: [validator.isEmail, "Please enter valid email address"]
        },
        password:{
            type:String,
            required:[true,"Please enter passwword"],
            minlength:[6,"Your password must be longer thsn 6 characters"],
            select:false
        },
        passwordConfirm:{
            type:String,
            required:[true,"Please confirm your password"],
            validate:{
                validator:function(el){
                    return el === this.password
                },
                message:"Password is not same !"
            }
        },
        phoneNumber:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        avatar:{
            url:{type:String},
            public_id:{type:String}
        },
        passwordChangedAt:{
            type:Date,
        },
        passwordResetToken:{
            type:String,
            select:true,
            index:true
        },
        passwordResetExpires:{
            type:Date,
            select:false,
        },
    },
    {timestamps:true}

)
userSchema.set("toJSON",{
    transform:function(document,ret){
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;

    }
})

//password logic
//hashing
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
    
})

// login check
//test123===efnwfwijfiwjfwo
userSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
  return await bcrypt.compare(candidatePassword,userPassword)    
}

//
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp=parseInt(
            this.passwordChangedAt.getTime()/1000 , 
            10
        );
        return JWTTimestamp < changedTimeStamp
    }
    return false;
} 

//forget password
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken=crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex")

    this.passwordResetExpires = Date.now() +10 *60 *1000;
    return resetToken;
}

const User = mongoose.model("User",userSchema)
//in mongdb: users
export{User};
