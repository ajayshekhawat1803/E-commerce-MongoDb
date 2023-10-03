import express from "express"
import productModel from "./DB/productModel.js";
import multer from "multer";
import path from "path"

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    let allProducts = await productModel.find({});
    res.json(allProducts)
})

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
        // Use the student's name as the filename and keep the original extension
        const ext = path.extname(file.originalname);
        const filename = req.body.name + ext;
        callback(null, filename);
    },
})
const upload = multer({ storage: storage });

// productRouter.post("/add", async (req, res) => {
//     let productToAdd = new productModel(req.body)
//     let result = await productToAdd.save()
//     console.log(result);
//     res.send("Post REQUEST IS RIUNNING");
// })
productRouter.post("/add", upload.single("image"), async (req, res) => {
    const { name, price, category,company } = req.body;
    const image = req.file;
    const imagepath = image.path;
    let productToAdd = new productModel({ name, price, category, company,imagepath })
    let result = await productToAdd.save();
    res.json(result)
})

export default productRouter