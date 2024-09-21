import mongoose from "mongoose";



const profileImage = 'https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg'


const userSchema= mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
    }, 
    Image: {
        type: String,
        default: profileImage,
    }, 
    searchHistory: {
        type: Array,
        default: []
    }
})


export const User= mongoose.model('User', userSchema)