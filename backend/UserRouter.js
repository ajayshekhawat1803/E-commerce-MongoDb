import express from "express"
import UserModel from "./DB/UserModel.js";

const UserRouter = express.Router();

UserRouter.post("/register",async(req,res)=>{
    let UsertoRegister = new UserModel(req.body)
    let result = await UsertoRegister.save()
    // result=result.data
    // console.log(result);
    res.json(result)
})
UserRouter.post("/login",async(req,res)=>{
    if (req.body.username && req.body.password) {
        let usertologin = await UserModel.findOne(req.body).select("-password")

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

export default UserRouter