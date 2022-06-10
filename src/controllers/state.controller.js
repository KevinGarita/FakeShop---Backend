const controllerHelper = require('../helpers/controllerHelper');
const { state } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_state = req.params.id;

    const result = await state.findByPk(id_state);

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await state.findAndCountAll({
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_state', 'ASC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await state.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_state = req.params.id;
    const data = req.body;

    const result = await state.findByPk(id_state);

    if(!result){
        return result
    }else{
        await result.update(data);
        return result
    };
});