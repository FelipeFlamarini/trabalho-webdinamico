import client from './client.js'
import { produtos, usuarios } from './structure.js';

async function getProductById(id) {
    return await produtos.findOne({ where: { id: id } });
};

async function getAllProducts() {
    return await produtos.findAll();
};

async function getProductsMostViewed(limit) {
    return await produtos.findAll({
        order: [
            ['views', 'DESC']
        ],
        limit: limit,
    })
}

export { getAllProducts, getProductById, getProductsMostViewed };
