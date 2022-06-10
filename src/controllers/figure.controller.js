const controllerHelper = require('../helpers/controllerHelper');
const { figure, category, state, franchise } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_figure = req.params.id;

    const result = await figure.findByPk(id_figure, {
        include: [category, state, franchise],
        attributes: ['id_figure', 'name', 'description', 'price', 'image_url']
    });

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await figure.findAndCountAll({
        include: [category, state, franchise],
        attributes: ['id_figure', 'name', 'description', 'price', 'image_url'],
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_figure', 'DESC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await figure.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_figure = req.params.id;
    const data = req.body;

    const result = await figure.findByPk(id_figure);

    if(!result){
        return result
    }else{
        await result.update(data);
        return await figure.findByPk(id_figure, {
            include: [category, state, franchise],
            attributes: ['id_figure', 'name', 'description', 'price', 'image_url']
        });
    };
});

exports.deleteObject = controllerHelper(async (req, res) => {
    const id_figure = req.params.id;
    
    const result = await figure.findByPk(id_figure);

    if(!result){
        return result
    }else{
        await result.destroy();
        return result;
    }
});