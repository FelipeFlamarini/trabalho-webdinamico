import express, { json } from 'express';
import cors from 'cors';
import url from 'url';
import bodyparser from 'body-parser';
import { getAllProducts, getProductById, getProductsMostViewed, getProductsMostSold, getProductsLeastStock} from './DB/functions.js';
import { error } from 'console';

const app = express();

app.use(cors());
app.use(json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false}));

app.get("/api/products/:id", async (req, res) => {
    // se id for NaN, retornar todos os produtos
    // se id for um número, retornar o produto com o id\
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

// servindo imagens dos produtos
app.use("/api/productImages", express.static("./server/public/imgs/produtos"));

try {
    app.listen(3000)
    console.log("Server running on port 3000");
}
catch {
    console.log("Error on server");
};

export default app;