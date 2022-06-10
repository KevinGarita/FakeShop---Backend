const controllerHelper = require('../helpers/controllerHelper');
const { souvenir, category, state, franchise, type_souvenir } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_souvenir = req.params.id;

    const result = await souvenir.findByPk(id_souvenir, {
        include: [category, state, franchise, type_souvenir],
        attributes: ['id_souvenir', 'name', 'description', 'price', 'image_url']
    });

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await souvenir.findAndCountAll({
        include: [category, state, franchise, type_souvenir],
        attributes: ['id_souvenir', 'name', 'description', 'price', 'image_url'],
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_souvenir', 'DESC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await souvenir.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_souvenir = req.params.id;
    const data = req.body;

    const result = await souvenir.findByPk(id_souvenir);

    if(!result){
        return result
    }else{
        await result.update(data);
        return await souvenir.findByPk(id_souvenir, {
            include: [category, state, franchise, type_souvenir],
            attributes: ['id_souvenir', 'name', 'description', 'price', 'image_url']
        });
    };
});

exports.deleteObject = controllerHelper(async (req, res) => {
    const id_souvenir = req.params.id;
    
    const result = await souvenir.findByPk(id_souvenir);

    if(!result){
        return result
    }else{
        await result.destroy();
        return result;
    }
});