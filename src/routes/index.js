const login = require('../routes/login.routes');
const user = require('../routes/user.routes');
const state = require('../routes/state.routes');
const manga = require('../routes/manga.routes');
const figure = require('../routes/figure.routes');
const category = require('../routes/category.routes');
const souvenir = require('../routes/souvenir.routes');
const franchise = require('../routes/franchise.routes');
const comment = require('../routes/comment.routes');
const type_souvenir = require('../routes/type_souvenir.routes');



module.exports = {
    login,
    user,
    state,
    manga,
    figure,
    category,
    souvenir,
    franchise,
    comment,
    type_souvenir
}