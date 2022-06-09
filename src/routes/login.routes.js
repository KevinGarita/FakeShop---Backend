var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

/**
 * @swagger
 * /login:
 *  post:
 *   summary: access to the user
 *   tags: [Auth]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/User'
 *      example:
 *        email: test@gmail.com
 *        password: test12345 
 *   responses:
 *      200:
 *        description: user info and token
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/User'
 *          example:
 *            data: all the user information in a json
 *            token: unique token to authenticate the session
 *      400: 
 *        $ref: '#/components/responses/Bad_Request'
 *      401: 
 *        $ref: '#/components/responses/Unauthorized'
 *      403: 
 *        $ref: '#/components/responses/Forbidden'
 *      404: 
 *        $ref: '#/components/responses/Not_Found'
 *      409: 
 *        $ref: '#/components/responses/Conflict'
 *      423: 
 *        $ref: '#/components/responses/Locked'
 *      5XX: 
 *        $ref: '#/components/responses/Unexpected'
 */
router.post('/login', routerHelper(loginController.login, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({message: "User not found"});
    }else if(result.checkPassword == false){
        res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({message: 'Invalid password'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

module.exports = router;