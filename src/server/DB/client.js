import { Sequelize } from 'sequelize';

const client = new Sequelize(`funko`, `funko`, `1234`, {
    host: `localhost`,
    dialect: `postgres`,
});

try {
    await client.authenticate();
    console.log('Connected to db.');
  } catch (error) {
    console.error('Error:', error);
  }

export default client;
export { client, Sequelize }