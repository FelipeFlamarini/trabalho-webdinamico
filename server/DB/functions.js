import client from './client.js'

async function getAllProducts() {
    const query = await client.query(`SELECT * FROM produtos;`)
    return query;
};

export { getAllProducts };
