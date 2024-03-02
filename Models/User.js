import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String
},{timestamps: true});

export const UserModel = mongoose.model('User', UserSchema);