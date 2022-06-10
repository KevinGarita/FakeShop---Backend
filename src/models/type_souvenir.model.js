const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const type_souvenir = dbConnection.define('type_souvenir', {
    id_type: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = type_souvenir;