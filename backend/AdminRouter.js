import express from "express"
import AdminModel from "./DB/AdminModel.js";
import bcrypt from 'bcrypt'

const AdminRouter = express.Router();

AdminRouter.post("/register", async (req, res) => {
    let { name, email, username, password } = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.error(err);
            return null
        }
        password = hash
        let admintoRegister = new AdminModel({ name, email, username, password })
        let result = await admintoRegister.save()
        console.log(result);
        res.json(result)
    })
})

AdminRouter.post("/login", async (req, res) => {
    if (req.body.username && req.body.password) {
        let admintologin = await AdminModel.findOne({ username: req.body.username })
        bcrypt.compare(req.body.password, admintologin.password, (err, result) => {
            if (err || !result) {
                res.status(401).json({ message: 'Authentication failed' });
                console.log(err, result, "ifff wala h");
            }
            else {
                console.log("Matched");
                res.send(admintologin)
            }
        });
    }
})

export default AdminRouter