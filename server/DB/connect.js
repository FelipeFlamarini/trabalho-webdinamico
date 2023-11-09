import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'funko',
    user: 'funko',
    password: '1234',
  })

client.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('connected to database');
    }
});

async function closeConnection() {
    client.end((err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(`finalizado`)
        }
    });
}


export default client;
export { closeConnection };