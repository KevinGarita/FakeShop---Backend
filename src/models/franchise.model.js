const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const franchise = dbConnection.define('franchise', {
    id_franchise: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    franchise: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = franchise;