import express, { json } from "express";
import cors from "cors";
import url from "url";
import bodyparser from "body-parser";
import {
    getAllProducts,
    getProductById,
    getProductsMostViewed,
    getProductsMostSold,
    getProductsLeastStock,
    GetProductByUniverse,
    getProductsByName
} from "./DB/functions.js";
import { error } from "console";
import { produtos } from "./DB/structure.js";

const app = express();

app.use(cors());
app.use(json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false }));

app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            await getAllProducts()
                .then((query) => {
                    return query.map((product) => {
                        return product.dataValues;
                    });
                })
                .then((query) => {
                    res.status(200).send(query);
                });
        } else {
            await getProductById(id).then((query) => {
                res.status(200).send(query);
            });
        }
    } catch {
        console.log(error);
    }
});

app.get("/api/productsSearch", async (req, res) => {
    const { name } = req.query;
    let { limit } = req.query;
    if (isNaN(limit)) limit = 1;

    await getProductsByName(name, limit)
    .then(async (query) => {
        res.status(200).send(query);
    });
});

app.put("/api/cart/checkout", async (req, res) => {
    const { body } = req;
    const productsOnDB = [];
    const newEstoque = [];

    const estoque = body.map(async (item) => {
        const productOnDB = (await getProductById(item.id)).dataValues;
        productsOnDB.push(productOnDB);

        const tempEstoque = productOnDB.estoque - item.quantity;
        newEstoque.push(tempEstoque);

        if (tempEstoque < 0) {
            return false;
        }
        return true;
    });

    if ((await Promise.all(estoque)).includes(false)) {
        res.status(400).send("Estoque insuficiente");
    } else {
        productsOnDB.forEach(async (product, index) => {
            await produtos.update(
                { estoque: newEstoque[index] },
                { where: { id: product.id } }
            );
        });
        res.status(200).send("Compra realizada com sucesso");
    }
});
// filtros

app.get("/api/productsFilters/mostViewed", async (req, res) => {
    // produtos mais vistos
    const { limit } = req.query;
    try {
        const query = await getProductsMostViewed(limit);
        const query2 = [];
        query.forEach((product) => query2.push(product.dataValues));
        res.status(200).send(query);
    } catch {
        console.log(error);
    }
});

app.get("/api/productsFilters/mostSold", async (req, res) => {
    // produtos mais vendidos
    const { limit } = req.query;
    try {
        const query = await getProductsMostSold(limit);
        const query2 = [];
        query.forEach((product) => query2.push(product.dataValues));
        res.status(200).send(query);
    } catch {
        console.log(error);
    }
});

app.get("/api/productsFilters/leastStock", async (req, res) => {
    // produtos com menos estoque disponível
    const { limit } = req.query;
    try {
        const query = await getProductsLeastStock(limit);
        const query2 = [];
        query.forEach((product) => query2.push(product.dataValues));
        res.status(200).send(query);
    } catch {
        console.log(error);
    }
});

app.get("/api/products/universe/:universe", async (req, res) => {
    const universe = req.params.universe;
    let { limit } = req.query;
    if (isNaN(limit)) limit = 1;

    try {
        const query = await GetProductByUniverse(universe, limit);
        const formattedQuery = query.map((product) => product.dataValues);
        res.status(200).send(formattedQuery);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// servindo imagens dos produtos
app.use("/api/productImages", express.static("./server/public/imgs/produtos"));
app.use(
    "/api/productImagesTransparent",
    express.static("./server/public/imgs/produtosTransparent")
);

try {
    app.listen(3000);
    console.log("Server running on port 3000");
} catch {
    console.log("Error on server");
}

export default app;
