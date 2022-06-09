const {compare} =  require('../helpers/bcrypt');
const { tokenSign } = require('../helpers/generateToken')
const { user } = require('../models/index');
const controllerHelper = require('../helpers/controllerHelper');

exports.login = controllerHelper(async (req, res) => {
    const data = req.body;

    const result = await user.findOne({
        where: {
            email: data.email
        },
    });

    if(!result){
        return result
    }

    const checkPassword = await compare(data.password, result.password)

    if(checkPassword){
        const tokenSession = await tokenSign(result) 
        const info = {
            data: result,
            token: tokenSession
        }
        return info
    }else{
        result.checkPassword = checkPassword;
        return result;
    };
});