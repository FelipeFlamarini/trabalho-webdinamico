import express, { json } from 'express';
import cors from 'cors';
import url from 'url';
import bodyparser from 'body-parser';
import { getAllProducts, getProductById } from './DB/functions.js';
import { error } from 'console';
import { createReadStream } from 'fs';
import { get } from 'http';

const app = express();

app.use(cors());
app.use(json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false}));

let mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get("/api/products/:id", async (req, res) => {
    // se id for NaN, retornar todos os produtos
    // se id for um número, retornar o produto com o id\
    const id = parseInt(req.params.id);
    try {
        let query = ""
        if (isNaN(id)) {
            query = await getAllProducts();
            query = query.map((product) => product.dataValues);
            query = query.map((product) => {
                // adicionar nova chave
                product.teste = "teste";
                return product;
            });
        }
        else {
            query = await getProductById(id).dataValues;
        }
        res.status(200);
        // console.log(query)
        res.send(query);
    }
    catch {
        console.log(error);
    }
});

app.get("/api/productsFilters/mostViewed", async (req, res) => {
    const { limit } = req.query;
    if (!isNaN(limit)) {
        const products = getProductsMostViewed(limit);
        // filtrar no banco de dados os produtos mais vistos
    }
});

app.put("/api/:abc", async (req, res) => {
    const id = req.params.abc;
    const note = req.body;
    console.log(id)
    console.log(note)
    res.status(200);
    res.send()
})

try {
    app.listen(3000)
    console.log("Server running on port 3000");
}
catch {
    console.log("Error on server");
};

export default app;