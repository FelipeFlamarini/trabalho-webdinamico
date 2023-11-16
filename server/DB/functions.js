import client from './client.js'
import { produtos, usuarios } from './structure.js';

async function getProductById(id) {
    return await produtos.findOne({ where: { id: id } });
};

async function getAllProducts() {
    return await produtos.findAll();
};

async function GetProductByUniverse(specificUniverse){
    return await produtos.findAll({where:{universo:specificUniverse}})
}

async function GetProductByPrice(orderPrice){
    return await produtos.findAll({ order:[['preco',orderPrice]]})
}

export { getAllProducts, getProductById,GetProductByUniverse,GetProductByPrice };
