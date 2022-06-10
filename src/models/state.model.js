const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const state = dbConnection.define('state', {
    id_state: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = state;