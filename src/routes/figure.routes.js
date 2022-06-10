var express = require('express');
var router = express.Router();
const figureController = require('../controllers/figure.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

//Middlewares
const {checkAuth, desactivateRoute, checkRoleAuth} = require('../middlewares/index');


/**
 * @swagger
 * /figures/{id}:
 *  get:
 *   summary: get one figure
 *   tags: [Figure]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/Figure'
 *          examples: 
 *           getFigure:
 *            $ref: '#/components/examples/getFigure'
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
router.get('/figures/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['user', 'admin']), 
routerHelper(figureController.getObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

/**
 * @swagger
 * /figures:
 *  get:
 *   summary: get all figures
 *   tags: [Figure]
 *   parameters:
 *    - $ref: '#/components/parameters/offsetPagination'
 *    - $ref: '#/components/parameters/limitPagination'
 *   requestBody: 
 *    description: Completely optional, you can send a json with the attributes by which you want to filter the information, these attributes must match those of the associated schema. It is not necessary to send all the attributes, you can filter by any of them.
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Figure'
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
router.get('/figures', desactivateRoute(false), checkAuth, checkRoleAuth(['user', 'admin']), 
routerHelper(figureController.getObjects, async (req, res, result) => {
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
 * /figures:
 *  post:
 *   summary: create a figure
 *   tags: [Figure]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Figure'
 *      examples: 
 *       postFigure:
 *        $ref: '#/components/examples/postFigure'
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
router.post('/figures', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(figureController.addObject, async (req, res, result) => {
    res.sendStatus(HttpStatus.StatusCodes.CREATED);
}));


/**
 * @swagger
 * /figures/{id}:
 *  put:
 *   summary: update one figure
 *   tags: [Figure]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Figure'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/Figure'
 *          examples: 
 *           getFigure:
 *            $ref: '#/components/examples/getFigure'
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
router.put('/figures/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(figureController.updateObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to update was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));


/**
 * @swagger
 * /figures/{id}:
 *  delete:
 *   summary: delete one figure
 *   tags: [Figure]
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
router.delete('/figures/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(figureController.deleteObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to delete was not found'});
    }else{
        res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    }
}));

module.exports = router;