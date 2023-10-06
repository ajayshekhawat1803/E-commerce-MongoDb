import express from "express"
import UserModel from "./DB/UserModel.js";
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
    let UsertoRegister = new UserModel(req.body)
    let result = await UsertoRegister.save()
    res.json(result)
})
UserRouter.post("/login", async (req, res) => {
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

UserRouter.get("/:id",async(req,res)=>{
    let result = await UserModel.findOne({_id:req.params.id})
    res.json(result)
})

UserRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;
    let result = await UserModel.updateOne({ _id: id }, { $set: updateFields })
    res.json(result)
})
UserRouter.patch("/update/address/:id", async (req, res) => {
    const id = req.params.id;
    const updateFields = req.body;
    // let result = await UserModel.updateOne({ _id: id }, { $set: {address.addline1: } })
    console.log(result);
    // res.send("Chal rha h")
    res.json(result)
})

export default UserRouter