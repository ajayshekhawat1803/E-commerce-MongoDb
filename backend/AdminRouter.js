import express from "express"
import AdminModel from "./DB/AdminModel.js";
import multer from "multer";
import path from "path"

const AdminRouter = express.Router();

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

AdminRouter.post("/register",async(req,res)=>{
    let UsertoRegister = new AdminModel(req.body)
    let result = await UsertoRegister.save()
    // result=result.data
    // console.log(result);
    res.json(result)
})

AdminRouter.post("/login",async(req,res)=>{
    if (req.body.username && req.body.password) {
        let usertologin = await AdminModel.findOne(req.body).select("-password")

        if (usertologin) {
            res.send(usertologin)
        } else {
            res.send({ result: "no user found" })
        }
    }
    else {
        res.send({ result: "Plzz Enter both fields" })
    }
})


export default AdminRouter