import {Sequelize, client} from './client.js';

const produtos = client.define('produtos', {
    nome: {
        type: Sequelize.STRING
    },
    universo: {
        type: Sequelize.STRING
    },
    preco: {
        type: Sequelize.FLOAT
    },
    descricao: {
        type: Sequelize.STRING
    },
    views: {
        type: Sequelize.INTEGER
    },
    vendas: {
        type: Sequelize.INTEGER
    },
    estoque: {
        type: Sequelize.INTEGER
    },
});

const usuarios = client.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    },
    telefone: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN
    },
    imagem: {
        type: Sequelize.STRING
    },
    compras: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
});

export { produtos, usuarios };