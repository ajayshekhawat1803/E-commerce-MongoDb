import express from "express"
import UserModel from "./DB/UserModel.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

const UserRouter = express.Router();

const secretKey = 'ajay-shekhawat'

UserRouter.post("/register", async (req, res) => {
    let { name, email, username, password } = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.error(err);
            return null
        }
        password = hash
        let usertoRegister = new UserModel({ name, email, username, password })
        let result = await usertoRegister.save()
        console.log(result);
        res.json(result)
    })
})

UserRouter.post("/login", async (req, res) => {
    if (req.body.username && req.body.password) {
        let usertologin = await UserModel.findOne({ username: req.body.username })
        bcrypt.compare(req.body.password, usertologin.password, (err, result) => {
            if (err || !result) {
                res.json({ message: "Password Incorrect" });
            }
            else {
                const payload = { username: usertologin.username, _Id: usertologin._id };
                const token = Jwt.sign(payload, secretKey, { expiresIn: '1h' });
                res.json({ usertologin, token });
            }
        });
    }
})

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


UserRouter.post("/reset-password", async (req, res) => {
    let { username, password } = req.body
    let user = await UserModel.findOne({ username: username })
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.error(err);
            return null
        }
        password = hash
        let result = await UserModel.updateOne({ username: username }, { $set: { password: password } })
        // console.log(user.password, "new wala updated");
        res.json(result)
    })
})

export default UserRouter