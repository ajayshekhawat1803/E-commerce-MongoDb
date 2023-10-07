import express from "express"
import UserModel from "./DB/UserModel.js";
import bcrypt from 'bcrypt'

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
    let { name, email, username, password } = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.error(err);
            return null
        }
        // console.log(hash);
        password = hash
        let admintoRegister = new UserModel({ name, email, username, password })
        let result = await admintoRegister.save()
        console.log(result);
        res.json(result)
    })
})
UserRouter.post("/login", async (req, res) => {
    if (req.body.username && req.body.password) {
        let usertologin = await UserModel.findOne({ username: req.body.username })
        // console.log(usertologin);
        bcrypt.compare(req.body.password, usertologin.password, (err, result) => {
            if (err || !result) {
                res.status(401).json({ message: 'Authentication failed' });
                console.log(err, result, "ifff wala h");
                // res.send({ result: "no user found" })
            }
            else {
                console.log("Matched");
                res.send(usertologin)
            }
        });
    }
})
// UserRouter.post("/register", async (req, res) => {
//     let UsertoRegister = new UserModel(req.body)
//     let result = await UsertoRegister.save()
//     res.json(result)
// })
// UserRouter.post("/login", async (req, res) => {
//     if (req.body.username && req.body.password) {
//         let usertologin = await UserModel.findOne(req.body).select("-password")

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

UserRouter.get("/:id", async (req, res) => {
    let result = await UserModel.findOne({ _id: req.params.id })
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
    const addressUpdates = req.body;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Create an object with $set to update specific address fields
        const addressUpdateObj = {};
        for (const field in addressUpdates) {
            if (field in user.address) {
                addressUpdateObj[`address.${field}`] = addressUpdates[field];
            }
        }
        await UserModel.updateOne({ _id: id }, { $set: addressUpdateObj });
        return res.json({ message: 'Address updated successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default UserRouter