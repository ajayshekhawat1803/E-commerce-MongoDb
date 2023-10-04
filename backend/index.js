import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import './DB/config.js'
import productRouter from "./productRouter.js";
import AdminRouter from "./AdminRouter.js";
import UserRouter from "./UserRouter.js";

import multer from "multer";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connection = mongoose.connect("mongodb://localhost:27017/e-commerce")

const port = 4000

const app = express()
app.use(express.json())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/product", productRouter)
app.use("/admin", AdminRouter)
app.use("/user", UserRouter)

connection.then(() => {
    app.listen(port, () =>
        console.log("Server started at port " + port))
})
    .catch((err) => console.log("DB ERROR: " + err));

