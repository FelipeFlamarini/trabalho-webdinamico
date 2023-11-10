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
    }
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
    }
});

export { produtos, usuarios };