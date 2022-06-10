const { verifyToken } = require('../helpers/generateToken')
const HttpStatus = require('http-status-codes');
const { user } = require('../models/index');

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop(); //231231321
        const tokenData = await verifyToken(token);
        const userData = await user.findByPk(tokenData.id_user);

        // ['user'].includes('user')
        if ([].concat(roles).includes(userData.role)) {  
            next()
        } else {
            res.status(HttpStatus.StatusCodes.FORBIDDEN)
            res.json({ message: 'You do not have permissions to consult this route' })
        }

    } catch (e) {
        res.status(HttpStatus.StatusCodes.CONFLICT)
        res.json({ message: 'Unexpected error, unable to check user role' })
    }

}

module.exports = checkRoleAuth