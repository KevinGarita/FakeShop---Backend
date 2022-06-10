const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const comment = dbConnection.define('comment', {
    id_comment: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    id_user: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id_figure: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = comment;