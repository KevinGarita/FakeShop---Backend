const { Sequelize, DataTypes } = require('sequelize');
var config = require('../../config/env.config');

const dbConnection = new Sequelize(config.database.URL,
    {
    pool: config.database.pool,
    define: config.database.define,
    dialectOptions: config.database.dialectOptions
    }
);

async function main() {
    try {
        await dbConnection.authenticate(); //Authenticate the connection to the database
        console.log('Connection has been established successfully.');

        //Required extensions in the database:
        //await dbConnection.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'); //only for postgres and only if we want to use fn('uuid_generate_v4') para migraciones.
        
        //Create, drop or alter tables in the data base:
        //await dbConnection.sync({ alter: true }); // or {force: true} to drop and recreate the tables
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main()

module.exports = {dbConnection, DataTypes};