const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const souvenir = dbConnection.define('souvenir', {
    id_souvenir: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(2000),
        allowNull: true
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_state: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    id_category: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    id_franchise: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    id_type: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
});

module.exports = souvenir;