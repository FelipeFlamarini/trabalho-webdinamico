import client from './client.js'
import { produtos, usuarios } from './structure.js';

async function getProductById(id) {
    // console.log(await produtos.findOne({ where: { id: 3 } }))
    return await produtos.findOne({ where: { id: id } });
};

async function getAllProducts() {
    // console.log(await produtos.findAll())
    return await produtos.findAll();
};

export { getAllProducts, getProductById };
