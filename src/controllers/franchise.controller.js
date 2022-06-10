const controllerHelper = require('../helpers/controllerHelper');
const { franchise } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_franchise = req.params.id;

    const result = await franchise.findByPk(id_franchise);

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await franchise.findAndCountAll({
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_franchise', 'ASC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await franchise.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_franchise = req.params.id;
    const data = req.body;

    const result = await franchise.findByPk(id_franchise);

    if(!result){
        return result
    }else{
        await result.update(data);
        return result
    };
});