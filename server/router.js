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
        let query = ""
        if (isNaN(id)) {
            query = await getAllProducts();
            query = query.map((product) => product.dataValues);
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