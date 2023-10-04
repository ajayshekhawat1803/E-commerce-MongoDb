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
    destination: "uploads/products",
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
    const { name, price, category, company } = req.body;
    const image = req.file;
    let productToAdd = new productModel({ name, price, category, company, image })
    let result = await productToAdd.save();
    res.json(result)
})
// To Delete
productRouter.delete("/del/:id", async (req, res) => {
    const productToDeleteId = req.params.id;
    let result = await productModel.deleteOne({ _id: productToDeleteId })
    res.json(result);
})
//To Update
productRouter.get("/edit/:id", async (req, res) => {
    let result = await productModel.findOne({ _id: req.params.id })
    if (result) {
        res.json(result)
    } else {
        res.send({ Result: "NO Product Found" })
    }
})
// productRouter.put("/update/:id", async (req, res) => {
//     let result = await productModel.updateOne(
//         { _id: req.params.id },
//         {
//             $set: req.body
//         }
//     )
//     res.json(result)
// })
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