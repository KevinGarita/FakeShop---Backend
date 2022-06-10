var express = require('express');
var router = express.Router();
const type_souvenirController = require('../controllers/type_souvenir.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

//Middlewares
const {checkAuth, desactivateRoute, checkRoleAuth} = require('../middlewares/index');


/**
 * @swagger
 * /type-souvenir/{id}:
 *  get:
 *   summary: get one type souvenir
 *   tags: [Type Souvenir]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/TypeSouvenir'
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
router.get('/type-souvenir/:id', desactivateRoute(false), checkRoleAuth(['user', 'admin']), 
routerHelper(type_souvenirController.getObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

/**
 * @swagger
 * /type-souvenir:
 *  get:
 *   summary: get all types souvenirs
 *   tags: [Type Souvenir]
 *   parameters:
 *    - $ref: '#/components/parameters/offsetPagination'
 *    - $ref: '#/components/parameters/limitPagination'
 *   requestBody: 
 *    description: Completely optional, you can send a json with the attributes by which you want to filter the information, these attributes must match those of the associated schema. It is not necessary to send all the attributes, you can filter by any of them.
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/TypeSouvenir'
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
router.get('/type-souvenir', desactivateRoute(false), checkRoleAuth(['user', 'admin']), 
routerHelper(type_souvenirController.getObjects, async (req, res, result) => {
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
 * /type-souvenir:
 *  post:
 *   summary: create a type souvenir
 *   tags: [Type Souvenir]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/TypeSouvenir'
 *      examples: 
 *       postType Souvenir:
 *        $ref: '#/components/examples/postTypeSouvenir'
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
router.post('/type-souvenir', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(type_souvenirController.addObject, async (req, res, result) => {
    res.sendStatus(HttpStatus.StatusCodes.CREATED);
}));


/**
 * @swagger
 * /type-souvenir/{id}:
 *  put:
 *   summary: update one type souvenir
 *   tags: [Type Souvenir]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/TypeSouvenir'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/TypeSouvenir'
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
router.put('/type-souvenir/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(type_souvenirController.updateObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to update was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

module.exports = router;