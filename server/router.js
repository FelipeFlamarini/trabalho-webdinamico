const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    res.status(200);
    res.send({ id: id, name: "Product " + id });
});

app.put("/api/:id", (req, res) => {
    const id = req.params.id;
    const note = req.body;
    console.log(id)
    console.log(note)
    res.status(200);
    res.send()
})

app.listen(3000);