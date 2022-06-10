const controllerHelper = require('../helpers/controllerHelper');
const { type_souvenir } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_type = req.params.id;

    const result = await type_souvenir.findByPk(id_type);

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await type_souvenir.findAndCountAll({
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_type', 'ASC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await type_souvenir.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_type = req.params.id;
    const data = req.body;

    const result = await type_souvenir.findByPk(id_type);

    if(!result){
        return result
    }else{
        await result.update(data);
        return result
    };
});