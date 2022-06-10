var express = require('express');
var router = express.Router();
const commentController = require('../controllers/comment.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

//Middlewares
const {checkAuth, desactivateRoute, checkRoleAuth} = require('../middlewares/index');


/**
 * @swagger
 * /comments/{id}:
 *  get:
 *   summary: get one comment
 *   tags: [Comment]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/Comment'
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
router.get('/comments/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['user', 'admin']), 
routerHelper(commentController.getObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

/**
 * @swagger
 * /comments:
 *  get:
 *   summary: get all comments
 *   tags: [Comment]
 *   parameters:
 *    - $ref: '#/components/parameters/offsetPagination'
 *    - $ref: '#/components/parameters/limitPagination'
 *   requestBody: 
 *    description: Completely optional, you can send a json with the attributes by which you want to filter the information, these attributes must match those of the associated schema. It is not necessary to send all the attributes, you can filter by any of them.
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Comment'
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
router.get('/comments', desactivateRoute(false), checkAuth, checkRoleAuth(['user', 'admin']), 
routerHelper(commentController.getObjects, async (req, res, result) => {
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
 * /comments:
 *  post:
 *   summary: create a comment
 *   tags: [Comment]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Comment'
 *      examples: 
 *       postComment:
 *        $ref: '#/components/examples/postComment'
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
router.post('/comments', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(commentController.addObject, async (req, res, result) => {
    res.sendStatus(HttpStatus.StatusCodes.CREATED);
}));


/**
 * @swagger
 * /comments/{id}:
 *  put:
 *   summary: update one comment
 *   tags: [Comment]
 *   parameters:
 *    - $ref: '#/components/parameters/identifier'
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        $ref: '#/components/schemas/Comment'
 *   responses: 
 *      200:
 *        description: The request succeeded.
 *        content:
 *         application/json:
 *          schema: 
 *           $ref: '#/components/schemas/Comment'
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
router.put('/comments/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(commentController.updateObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to update was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));


/**
 * @swagger
 * /comments/{id}:
 *  delete:
 *   summary: delete one comment
 *   tags: [Comment]
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
router.delete('/comments/:id', desactivateRoute(false), checkAuth, checkRoleAuth(['admin']), 
routerHelper(commentController.deleteObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to delete was not found'});
    }else{
        res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    }
}));

module.exports = router;