const app = require('./app');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('./helpers/swagger');

//Routes
const { login, user } = require('./routes/index');

//Route to documentation
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

/**
 * @swagger
 * components:
 *  examples:
 *   login:
 *    email: test@gmail.com
 *    password: test12345    
 */
app.use(login); //login route

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        format: uuid
 *        description: unique user identifier
 *      username:
 *        type: string
 *        description: user's nickname
 *      email: 
 *        type: string
 *        description: user's email address
 *      password: 
 *        type: string
 *        format: password
 *        description: user password 
 *      role: 
 *        type: string
 *        description: the level of privileges the user has
 *    required:
 *     - username
 *     - email
 *     - password
 *    example: 
 *     id: f0c0783f-5bc1-43f7-be0d-7182996f2d70
 *     username: test_user
 *     email: test@gmail.com
 *     password: $2a$10$vbGLX5coLe2oZuHIYqQYA.9k/UGR2Y34uFCyTuyHUGmB7EuboPSYS
 *     role: user
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postUser:
 *     summary: post user
 *     value:
 *       username: test_user
 *       email: test@gmail.com
 *       password: test12345
 */
app.use(user); //User routes

