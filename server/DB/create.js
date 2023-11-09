const postgres = require('postgresql')


postgres.connect('postgres://localhost:5432/DB', (err, client) => {});