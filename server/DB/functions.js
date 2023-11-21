import client from "./client.js";
import { Op } from "sequelize";
import { produtos, usuarios } from "./structure.js";

async function getProductById(id) {
    return await produtos.findOne({ where: { id: id } });
}

async function getAllProducts() {
    return await produtos.findAll();
}

async function getProductsMostViewed(limit) {
    return await produtos.findAll({
        order: [["views", "DESC"]],
        limit: limit,
    });
}

async function getProductsMostSold(limit) {
    return await produtos.findAll({
        where: {
            estoque: {
                [Op.gt]: 0,
            },
        },
        order: [["vendas", "DESC"]],
        limit: limit,
    });
}

async function getProductsLeastStock(limit) {
    return await produtos.findAll({
        where: {
            estoque: {
                [Op.gt]: 0,
            },
        },
        order: [["estoque", "ASC"]],
        limit: limit,
    });
}

async function getProductsByUniverseLimit(specificUniverse, limit) {
    return await produtos.findAll({
        where: {
            universo: specificUniverse,
        },
        limit: limit,
    });
}

async function getProductsByName(name, limit) {
    return await produtos.findAll({
        where: {
            [Op.or]: [
                {
                    nome: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
                {
                    universo: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
            ],
        },
        limit: limit,
    });
}

async function GetProductByUniverse(specificUniverse) {
    return await produtos.findAll({ where: { universo: specificUniverse } });
}

async function GetProductByPrice(orderPrice) {
    return await produtos.findAll({ order: [["preco", orderPrice]] });
}

async function incrementView(id) {
    produtos.update(
        { views: client.literal("views + 1") },
        { where: { id: id } }
    );
}

async function incrementSell(id, quantity) {
    produtos.update(
        { vendas: client.literal(`vendas + ${quantity}`) },
        { where: { id: id } }
    );
}

export {
    getAllProducts,
    getProductById,
    GetProductByUniverse,
    getProductsByUniverseLimit,
    GetProductByPrice,
    getProductsMostViewed,
    getProductsMostSold,
    getProductsLeastStock,
    getProductsByName,
    incrementView,
    incrementSell
};
