import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    name:String,
    email: String,
    username: String,
    password: String
});

const AdminModel = mongoose.model("admins",AdminSchema);
export default AdminModel