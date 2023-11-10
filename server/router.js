import express, { json } from 'express';
import cors from 'cors';
import url from 'url';
import bodyparser from 'body-parser';
import { getAllProducts } from './DB/functions.js';
import { error } from 'console';

const app = express();

app.use(cors());
app.use(json());
app.use(bodyparser.urlencoded({ limit: "50mb", extended: false}));

app.get("/api/products/all", async (req, res) => {
    var q = url.parse(req.url, true);

    try {
        const allProducts = await getAllProducts();
        res.status(200);
        res.send(allProducts.rows);
    }
    catch {
        console.log(error);
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
}
export default app;