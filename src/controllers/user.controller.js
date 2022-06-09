const controllerHelper = require('../helpers/controllerHelper');
const { user } = require('../models/index');
const {encrypt, compare} = require('../helpers/bcrypt');
const pagination = require('../helpers/pagination');

exports.getObject = controllerHelper(async (req, res) => {
    const id = req.params.id;

    const result = await user.findByPk(id, {
        attributes: ['id','username', 'email', 'role'],
    });

    return result;
});

exports.getObjects = controllerHelper(async (req, res) => {
    const pag = await pagination(req.query.page, req.query.limit);
    const filters = req.body;

    const result = await user.findAndCountAll({
        distinct: true,
        where: filters,
        attributes: ['id','username', 'email', 'role'],  
        limit: pag.limit,
        offset: pag.page * pag.limit,
        order: [['username', 'ASC']]
    });

    return result;
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    data.password = await encrypt(data.password); //Encripta la contraseña
    
    const result = await user.create(data);

    return result;
});

exports.updateObject = controllerHelper(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await user.findByPk(id);

    if(!result){
        return result
    }else if(data.password && data.current_password){
        const checkPassword = await compare(data.current_password, result.password); 
        if(checkPassword){
            data.password = await encrypt(data.password);
            await result.update(data);
            return result;
        }else{
            result.checkPassword = checkPassword;
            return result;
        }
    }else if(data.password && !data.current_password){
            result.current_password = false;
            return result;
    }else{
        await result.update(data);
        return result
    };
});

exports.deleteObject = controllerHelper(async (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    
    const result = await user.findByPk(id);

    if(!result){
        return result
    }else if(password){
        const checkPassword = await compare(password, result.password); 
        if(checkPassword){
            await result.destroy();
            return result;
        }else{
            result.checkPassword = checkPassword;
            return result;
        }
    }else{
        result.password = false;
        return result;
    };
});

exports.adminDeleteObject = controllerHelper(async (req, res) => {
    const id = req.params.id;
    
    const result = await customers.findByPk(id);

    if(!result){
        return result
    }else{
        await result.destroy();
        return result;
    };
});