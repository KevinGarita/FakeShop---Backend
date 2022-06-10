const user = require('../models/user.model');
const state = require('../models/state.model');
const manga = require('../models/manga.model');
const figure = require('../models/figure.model');
const product = require('../models/product.model');
const category = require('../models/category.model');
const souvenir = require('../models/souvenir.model');
const franchise = require('../models/franchise.model');
const comment = require('../models/comment.model');
const type_souvenir = require('../models/type_souvenir.model');

//Relationships between the tables

//Relationship between user and comment tables
comment.belongsTo(user, { foreignKey: 'id_user', onDelete: 'CASCADE' });
user.hasMany(comment, { foreignKey: 'id_user' });

//Relationship between product and comment tables
comment.belongsTo(product, { foreignKey: 'id_product', onDelete: 'CASCADE' });
product.hasMany(comment, { foreignKey: 'id_product' });

//Relationship between figure and comment tables
comment.belongsTo(figure, { foreignKey: 'id_article' }); //Agregar trigger para eliminar
figure.hasMany(comment, { foreignKey: 'id_article' });

//Relationship between manga and comment tables
comment.belongsTo(manga, { foreignKey: 'id_article' }); //Agregar trigger para eliminar
manga.hasMany(comment, { foreignKey: 'id_article' });

//Relationship between souvenir and comment tables
comment.belongsTo(souvenir, { foreignKey: 'id_article' }); //Agregar trigger para eliminar
souvenir.hasMany(comment, { foreignKey: 'id_article' });

//Relationship between figure and category tables
figure.belongsTo(category, { foreignKey: 'id_category' });
category.hasMany(figure, { foreignKey: 'id_category' });

//Relationship between figure and state tables
figure.belongsTo(state, { foreignKey: 'id_state' });
state.hasMany(figure, { foreignKey: 'id_state' });

//Relationship between figure and franchise tables
figure.belongsTo(franchise, { foreignKey: 'id_franchise' });
franchise.hasMany(figure, { foreignKey: 'id_franchise' });

//Relationship between manga and category tables
manga.belongsTo(category, { foreignKey: 'id_category' });
category.hasMany(manga, { foreignKey: 'id_category' });

//Relationship between manga and state tables
manga.belongsTo(state, { foreignKey: 'id_state' });
state.hasMany(manga, { foreignKey: 'id_state' });

//Relationship between manga and franchise tables
manga.belongsTo(franchise, { foreignKey: 'id_franchise' });
franchise.hasMany(manga, { foreignKey: 'id_franchise' });

//Relationship between souvenir and category tables
souvenir.belongsTo(category, { foreignKey: 'id_category' });
category.hasMany(souvenir, { foreignKey: 'id_category' });

//Relationship between souvenir and state tables
souvenir.belongsTo(state, { foreignKey: 'id_state' });
state.hasMany(souvenir, { foreignKey: 'id_state' });

//Relationship between souvenir and franchise tables
souvenir.belongsTo(franchise, { foreignKey: 'id_franchise' });
franchise.hasMany(souvenir, { foreignKey: 'id_franchise' });

//Relationship between souvenir and type_souvenir tables
souvenir.belongsTo(type_souvenir, { foreignKey: 'id_type' });
type_souvenir.hasMany(souvenir, { foreignKey: 'id_type' });


//Triggers


module.exports = {
    user,
    state,
    manga,
    figure,
    product,
    category,
    souvenir,
    franchise,
    comment,
    type_souvenir
}