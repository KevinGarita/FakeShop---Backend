const controllerHelper = require('../helpers/controllerHelper');
const { comment } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_comment = req.params.id;

    const result = await comment.findByPk(id_comment);

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await comment.findAndCountAll({
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_comment', 'DESC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await comment.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_comment = req.params.id;
    const data = req.body;

    const result = await comment.findByPk(id_comment);

    if(!result){
        return result
    }else{
        await result.update(data);
        return result
    };
});

exports.deleteObject = controllerHelper(async (req, res) => {
    const id_comment = req.params.id;
    
    const result = await comment.findByPk(id_comment);

    if(!result){
        return result
    }else{
        await result.destroy();
        return result;
    };
});