import express, { json } from 'express';
import cors from 'cors';
import url from 'url';
import bodyparser from 'body-parser';
import { getAllProducts } from './DB/functions.js';

const app = express();

app.use(cors());
app.use(json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false}));

app.get("/api/products/all", async (req, res) => {
    const id = req.params.id;
    var q = url.parse(req.url, true);
    console.log(q.query);

    const allProducts = await getAllProducts();
    console.log(allProducts.rows)

    res.status(200);
    res.send(promise);
});

app.put("/api/:abc", async (req, res) => {
    const id = req.params.abc;
    const note = req.body;
    console.log(id)
    console.log(note)
    res.status(200);
    res.send()
})

app.listen(3000);

export default app;