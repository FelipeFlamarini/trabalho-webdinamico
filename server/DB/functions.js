import client from './client.js'
import { produtos, usuarios } from './structure.js';

async function getProductById(id) {
    return await produtos.findOne({ where: { id: id } });
};

async function getAllProducts() {
    return await produtos.findAll();
};

export { getAllProducts, getProductById };
