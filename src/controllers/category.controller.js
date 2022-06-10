const controllerHelper = require('../helpers/controllerHelper');
const { category } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_category = req.params.id;

    const result = await category.findByPk(id_category);

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await category.findAndCountAll({
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_category', 'ASC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await category.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_category = req.params.id;
    const data = req.body;

    const result = await category.findByPk(id_category);

    if(!result){
        return result
    }else{
        await result.update(data);
        return result
    };
});