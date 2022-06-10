const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const category = dbConnection.define('category', {
    id_category: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = category;