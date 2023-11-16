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
    compras: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
});

const enderecos = client.define('enderecos', {
    usuario: {
        type: Sequelize.INTEGER
    },
    destinatario: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.INTEGER
    },
    numero: {
        type: Sequelize.INTEGER
    },
    complemento: {
        type: Sequelize.STRING
    }
});

const compras = client.define('compras', {
    usuario: {
        type: Sequelize.INTEGER
    },
    produtos: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    data: {
        type: Sequelize.DATE
    },
    valor: {
        type: Sequelize.FLOAT
    },
});

export { 
    produtos, 
    usuarios, 
    enderecos,
    compras,
};