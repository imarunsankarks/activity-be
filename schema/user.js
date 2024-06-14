const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        userid: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePhoto: {
            type: String,
            required: false,
            default: null 
        },
    },
)

// user static signup

userSchema.statics.signup = async function (userid, password,profilePhoto) {

    if(!userid || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(userid)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }
    const exists = await this.findOne({ userid });
    if (exists) {
        throw Error ('User already exists');
        
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({
        userid,
        password: hash,
        profilePhoto
    })
    return user;

}

// user static login
userSchema.statics.login = async function (userid, password) {

    if(!userid || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ userid });
    if (!user) {
        throw Error ('User not found');
    }
    const match =await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user;
}

module.exports = mongoose.model('User', userSchema)