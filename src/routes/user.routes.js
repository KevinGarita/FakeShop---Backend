var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

//Middlewares
const {checkAuth, checkRoleAuth, desactivateRoute} = require('../middlewares/index');

/**
 * @swagger
 * /users/{id}:
 *  get:
 *   summary: get one user, --roles:{user, admin}
 *   tags: [Users]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/User'
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
 *   security:
 *      - bearerAuth: []
 */
router.get('/users/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['user', 'admin']), 
routerHelper(userController.getObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));


/**
 * @swagger
 * /users:
 *  get:
 *   summary: get all users, --roles:{admin}
 *   tags: [Users]
 *   parameters:
 *    - $ref: '#/components/parameters/offsetPagination'
 *    - $ref: '#/components/parameters/limitPagination'
 *   requestBody: 
 *    description: Completely optional, you can send a json with the attributes by which you want to filter the information, these attributes must match those of the associated schema. It is not necessary to send all the attributes, you can filter by any of them.
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/User'
 *   responses: 
 *      200:
 *        $ref: '#/components/responses/Pagination'
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
 *   security:
 *      - bearerAuth: []
 */
router.get('/users', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(userController.getObjects, async (req, res, result) => {
    if(result.count == 0 && Object.keys(req.body).length == 0){
        res.status(HttpStatus.StatusCodes.NOT_FOUND)
        res.json({message: 'There is no data in the queried table'});
    }else if(result.count == 0 && Object.keys(req.body).length >= 1){
        res.status(HttpStatus.StatusCodes.NOT_FOUND)
        res.json({message: 'No objects were found that match the applied filters'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));


/**
 * @swagger
 * /users:
 *  post:
 *   summary: create a user
 *   tags: [Users]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/User'
 *      examples: 
 *       postUser:
 *        $ref: '#/components/examples/postUser'
 *   responses: 
 *      201:
 *        $ref: '#/components/responses/Created'
 *      400: 
 *        $ref: '#/components/responses/Bad_Request'
 *      401: 
 *        $ref: '#/components/responses/Unauthorized'
 *      403: 
 *        $ref: '#/components/responses/Forbidden'
 *      409: 
 *        $ref: '#/components/responses/Conflict'
 *      423: 
 *        $ref: '#/components/responses/Locked'
 *      5XX: 
 *        $ref: '#/components/responses/Unexpected'
 */
router.post('/users', desactivateRoute(false),
routerHelper(userController.addObject, async (req, res, result) => {
    res.sendStatus(HttpStatus.StatusCodes.CREATED);
}));


/**
 * @swagger
 * /users/{id}:
 *  put:
 *   summary: update one user, --roles:{user, admin}
 *   tags: [Users]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   requestBody: 
 *    description: If you want to update the user's password, it is necessary to send the user's {current_password} inside the body to confirm the change, Examples ->
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/User'
 *      examples: 
 *        updateUser:
 *          $ref: '#/components/schemas/User'
 *        updatePassword:
 *         value:
 *          current_password: test12345
 *          password: newPassword
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/User'
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
 *   security:
 *      - bearerAuth: []
 */
router.put('/users/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['user', 'admin']), 
routerHelper(userController.updateObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to update was not found'});
    }else if(result.checkPassword == false){
        res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({message: 'Invalid current password'});
    }else if(result.current_password == false){
        res.status(HttpStatus.StatusCodes.CONFLICT).json({message: 'To update the password you must send the current_password of the object'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));


/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   summary: delete one user, --roles:{user}
 *   tags: [Users]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   requestBody: 
 *    description: Please send the password to corroborate the deletion of the user
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/User'
 *      example: 
 *       password: test12345
 *   responses: 
 *      204:
 *        $ref: '#/components/responses/No_Content'
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
 *   security:
 *      - bearerAuth: []
 */
router.delete('/users/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['user']), 
routerHelper(userController.deleteObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to delete was not found'});
    }else if(result.password == false){
        res.status(HttpStatus.StatusCodes.CONFLICT).json({message: 'A password must be received to validate before deleting'});
    }else if(result.checkPassword == false){
        res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({message: 'Invalid password'});
    }else{
        res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    }
}));


/**
 * @swagger
 * /users/{id}/admin:
 *  delete:
 *   summary: delete one user, --roles:{admin}
 *   tags: [Users]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   responses: 
 *      204:
 *        $ref: '#/components/responses/No_Content'
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
 *   security:
 *      - bearerAuth: []
 */
router.delete('/users/:id/admin', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(userController.adminDeleteObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to delete was not found'});
    }else{
        res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    }
}));

module.exports = router;