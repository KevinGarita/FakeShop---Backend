var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/category.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

//Middlewares
const {checkAuth, desactivateRoute, checkRoleAuth} = require('../middlewares/index');


/**
 * @swagger
 * /category/{id}:
 *  get:
 *   summary: get one category
 *   tags: [Category]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/Category'
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
router.get('/category/:id', desactivateRoute(false), checkRoleAuth(['user', 'admin']), 
routerHelper(categoryController.getObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

/**
 * @swagger
 * /category:
 *  get:
 *   summary: get all categories
 *   tags: [Category]
 *   parameters:
 *    - $ref: '#/components/parameters/offsetPagination'
 *    - $ref: '#/components/parameters/limitPagination'
 *   requestBody: 
 *    description: Completely optional, you can send a json with the attributes by which you want to filter the information, these attributes must match those of the associated schema. It is not necessary to send all the attributes, you can filter by any of them.
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Category'
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
router.get('/category', desactivateRoute(false), checkRoleAuth(['user', 'admin']), 
routerHelper(categoryController.getObjects, async (req, res, result) => {
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
 * /category:
 *  post:
 *   summary: create a category
 *   tags: [Category]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Category'
 *      examples: 
 *       postCategory:
 *        $ref: '#/components/examples/postCategory'
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
 *   security:
 *      - bearerAuth: []
 */
router.post('/category', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(categoryController.addObject, async (req, res, result) => {
    res.sendStatus(HttpStatus.StatusCodes.CREATED);
}));


/**
 * @swagger
 * /category/{id}:
 *  put:
 *   summary: update one category
 *   tags: [Category]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Category'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/Category'
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
router.put('/category/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(categoryController.updateObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to update was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

module.exports = router;