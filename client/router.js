import express, { json } from "express";
import path from "path"
import { fileURLToPath } from 'url';

const app = express();

// setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname)

// serve public e node_modules (glide.js)
app.use(express.static(__dirname + '/public'));

app.get("/:page", async (req, res) => {
    const page = req.params.page;
    res.sendFile(__dirname + `/${page}`);
});

app.get("/", async (req, res) => {
    res.redirect("/home.html");
})

try {
    app.listen(3000);
    console.log("HTML Server running on port 3000");
} catch {
    console.log("Error on server");
};

export default app;