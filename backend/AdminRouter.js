import express from "express"
import AdminModel from "./DB/AdminModel.js";
import multer from "multer";
import path from "path"
import bcrypt from 'bcrypt'
import { log } from "console";

const AdminRouter = express.Router();

AdminRouter.post("/register", async (req, res) => {
    let { name, email, username, password } = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.error(err);
            return null
        }
        console.log(hash);
        password = hash
        let admintoRegister = new AdminModel({ name, email, username, password })
        let result = await admintoRegister.save()
        console.log(result);
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
        let usertologin = await AdminModel.findOne({ username: req.body.username })
        // console.log(usertologin);
        bcrypt.compare(req.body.password, usertologin.password, (err, result) => {
            if (err || !result) {
                //   return res.status(401).json({ message: 'Authentication failed' });
                console.log(err, result,"ifff wala h");
            }
            else {
                console.log("Matched");
            }
        });
        //     if (usertologin) {
        //         res.send(usertologin)
        //     } else {
        //         res.send({ result: "no user found" })
        //     }
        // }
        // else {
        //     res.send({ result: "Plzz Enter both fields" })
        }
    })



// AdminRouter.post("/login", async (req, res) => {
//     if (req.body.username && req.body.password) {
//         let usertologin = await AdminModel.findOne(req.body).select("-password")

//         if (usertologin) {
//             res.send(usertologin)
//         } else {
//             res.send({ result: "no user found" })
//         }
//     }
//     else {
//         res.send({ result: "Plzz Enter both fields" })
//     }
// })


export default AdminRouter