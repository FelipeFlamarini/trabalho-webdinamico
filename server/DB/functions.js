import client from './client.js'
import { produtos, usuarios } from './create.js';

async function getAllProducts() {
    return await produtos.findAll();
};

export { getAllProducts };
