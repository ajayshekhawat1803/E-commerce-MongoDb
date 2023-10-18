import express from "express"
import productModel from "./DB/productModel.js";
import multer from "multer";
import path from "path"
import Authorization from "./Authorisation.js";

const productRouter = express.Router();
const secretKey = 'ajay-shekhawat'


//********************To List all products in All Products Section********************
productRouter.get("/", async (req, res) => {
    let allProducts = await productModel.find({});
    res.json(allProducts)
})

//*******************************To Add a product to Database************************

//code to save image in uploads/product folder with filename as product name
const storage = multer.diskStorage({
    destination: "uploads/products",
    filename: function (req, file, callback) {
        // Use the student's name as the filename and keep the original extension
        const ext = path.extname(file.originalname);
        const filename = req.body.name + ext;
        callback(null, filename);
    },
})
const upload = multer({ storage: storage });

//Code to add product
productRouter.post("/add", upload.single("image"), async (req, res) => {
    const token = req.headers.authorization
    const AuthorisationResult = await Authorization(token, secretKey)
    if (AuthorisationResult) {
        const { name, price, category, company } = req.body;
        const image = req.file;
        let productToAdd = new productModel({ name, price, category, company, image })
        let result = await productToAdd.save();
        res.json(result)
    } else {
        return res.json({ message: 'Token is invalid' });
    }
})


//**********************************To Delete a product***************************
productRouter.delete("/del/:id", async (req, res) => {
    const token = req.headers.authorization
    const productToDeleteId = req.params.id;
    const AuthorisationResult = await Authorization(token, secretKey)
    if (AuthorisationResult) {
        let result = await productModel.deleteOne({ _id: productToDeleteId })
        res.json(result);
    } else {
        res.json({ message: 'Token is invalid' })
    }
})


//*****************************To Edit or to update a product********************

//for edit authorisation
productRouter.get("/:token", async (req, res) => {
    const AuthorisationResult = await Authorization(req.params.token, secretKey)
    if (AuthorisationResult) {
        res.status("200").json({ message: "Token Matched" })
    } else {
        res.status("401").json({ message: "Token MissMatched" })
    }
})

//To autofill the form with the details of the product i.e clicked
productRouter.get("/edit/:id", async (req, res) => {
    let result = await productModel.findOne({ _id: req.params.id })
    if (result) {
        res.json(result)
    } else {
        res.send({ Result: "NO Product Found" })
    }
})

//To  update the details of the product 
productRouter.put("/update/:id", upload.single("image"), async (req, res) => {
    const { name, price, category, company } = req.body
    let image = req.file
    const productToUpdate = { name, price, category, company, image }
    let result = await productModel.updateOne(
        { _id: req.params.id },
        {
            $set: productToUpdate
        }
    )
    res.json(result)
})

export default productRouter