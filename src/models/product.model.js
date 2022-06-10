const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const product = dbConnection.define('product', {
    id_product: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    product: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = product;