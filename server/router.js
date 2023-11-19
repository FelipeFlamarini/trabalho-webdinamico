import express, { json } from 'express';
import cors from 'cors';
import url from 'url';
import bodyparser from 'body-parser';
import { getAllProducts, getProductById } from './DB/functions.js';
import { error } from 'console';

const app = express();

app.use(cors());
app.use(json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false}));

app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        if (isNaN(id)) {
            await getAllProducts()
            .then((query) => {
                return query.map((product) => {
                    return product.dataValues;
                })
            })
            .then((query) => {
                res.status(200).send(query);

            });
        } else {
            await getProductById(id)
            .then((query) => {
                res.status(200).send(query);
            });
        }
    }
    catch {
        console.log(error);
    }
});

app.put("/api/cart/checkout", async (req, res) => {
    const { body } = req;
    body.forEach(async (item) => {
        await getProductById(item.id)
        .then((product) => {
            product.estoque -= item.quantity;
            product.save();
        });
    });
    res.status(200).send();
})

// servindo imagens dos produtos
app.use("/api/productImages", express.static("./server/public/imgs/produtos"));
app.use("/api/productImagesTransparent", express.static("./server/public/imgs/produtosTransparent"));

try {
    app.listen(3000)
    console.log("Server running on port 3000");
}
catch {
    console.log("Error on server");
}
export default app;