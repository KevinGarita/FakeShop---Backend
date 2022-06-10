const controllerHelper = require('../helpers/controllerHelper');
const { manga, category, state, franchise } = require('../models/index');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id_manga = req.params.id;

    const result = await manga.findByPk(id_manga, {
        include: [category, state, franchise],
        attributes: ['id_manga', 'name', 'description', 'price', 'image_url']
    });

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await manga.findAndCountAll({
        include: [category, state, franchise],
        attributes: ['id_manga', 'name', 'description', 'price', 'image_url'],
        distinct: true,
        where: filters,
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['id_manga', 'DESC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await manga.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id_manga = req.params.id;
    const data = req.body;

    const result = await manga.findByPk(id_manga);

    if(!result){
        return result
    }else{
        await result.update(data);
        return await manga.findByPk(id_manga, {
            include: [category, state, franchise],
            attributes: ['id_manga', 'name', 'description', 'price', 'image_url']
        });
    };
});

exports.deleteObject = controllerHelper(async (req, res) => {
    const id_manga = req.params.id;
    
    const result = await manga.findByPk(id_manga);

    if(!result){
        return result
    }else{
        await result.destroy();
        return result;
    }
});