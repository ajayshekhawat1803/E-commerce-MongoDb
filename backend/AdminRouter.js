import express from "express"
import AdminModel from "./DB/AdminModel.js";
import multer from "multer";
import path from "path"
import bcrypt from 'bcrypt'
import { log } from "console";

const AdminRouter = express.Router();

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

AdminRouter.post("/register", async (req, res) => {
    let { name, email, username, password } = req.body
    let admintoRegister = new AdminModel({ name, email, username, password })
    bcrypt.hash("password", 1, (err, hash) => {
        if (err) {
            console.error(err);
            return null
        }
        console.log(hash);
    })
})
// console.log(admintoRegister);
// let result = await UsertoRegister.save()
// res.json(result)

// AdminRouter.post("/register",async(req,res)=>{
//     let UsertoRegister = new AdminModel(req.body)
//     let result = await UsertoRegister.save()
//     // result=result.data
//     // console.log(result);
//     res.json(result)
// })

AdminRouter.post("/login", async (req, res) => {
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