import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        default: null
    },
    mobile: {
        type: Number,
        default: null
    },
    // address: {
    //     type: Object,
    //     default: null
    // }
    address: {
        addline1: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        },
        tehsil: {
            type: String,
            default: null
        },
        dist: {
            type: String,
            default: null
        },
        state: {
            type: String,
            default: null
        },
        pincode: {
            type: Number,
            default: null
        },
    }
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel