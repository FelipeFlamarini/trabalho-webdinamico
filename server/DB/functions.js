import client from './client.js'
import { Op } from 'sequelize';
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

async function getProductsMostSold(limit) {
    return await produtos.findAll({
        where: {
            estoque: {
                [Op.gt]: 0
            }
        },
        order: [
            ['vendas', 'DESC']
        ],
        limit: limit,
    })
}

async function getProductsLeastStock(limit) {
    return await produtos.findAll({
        where: {
            estoque: {
                [Op.gt]: 0
            }
        },
        order: [
            ['estoque', 'ASC']
        ],
        limit: limit,
    })
}

async function GetProductByUniverse(specificUniverse, limit){
    return await produtos.findAll({
        where: {
            universo: specificUniverse,
        },
        limit: limit,
    })
}

async function getProductsByName(name, limit) {
    return await produtos.findAll({
        where: {
            [Op.or]: [
                {
                    nome: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                {
                    universo: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            ]
        },
        limit: limit,
    })
}

export { getAllProducts, 
    getProductById, 
    getProductsMostViewed, 
    getProductsMostSold,
    getProductsLeastStock,
    GetProductByUniverse,
    getProductsByName,
};
