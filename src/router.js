const app = require('./app');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('./helpers/swagger');

//Routes
const { login, user, category, state, franchise, type_souvenir, figure, manga, souvenir, comment } = require('./routes/index');

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
 *        description: unique user identifier --> Schema Identifier
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
app.use(user); 

/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    properties:
 *      id_category:
 *        type: interger
 *        description: category identifier --> Schema Identifier
 *      category:
 *        type: string
 *        description: category name
 *    required:
 *     - category
 *    example: 
 *     id_category: 1
 *     category: Anime
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postCategory:
 *     summary: post category
 *     value:
 *       category: Anime
 */
app.use(category);
 

/**
 * @swagger
 * components:
 *  schemas:
 *   State:
 *    type: object
 *    properties:
 *      id_state:
 *        type: interger
 *        description: state identifier --> Schema Identifier
 *      state:
 *        type: string
 *        description: state name
 *    required:
 *     - state
 *    example: 
 *     id_state: 1
 *     state: Bajo pedido
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postState:
 *     summary: post state
 *     value:
 *       state: Bajo pedido
 */
app.use(state); 

/**
 * @swagger
 * components:
 *  schemas:
 *   Franchise:
 *    type: object
 *    properties:
 *      id_franchise:
 *        type: interger
 *        description: franchise identifier --> Schema Identifier
 *      franchise:
 *        type: string
 *        description: franchise name
 *    required:
 *     - franchise
 *    example: 
 *     id_franchise: 1
 *     franchise: Naruto
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postFranchise:
 *     summary: post franchise
 *     value:
 *       franchise: Naruto
 */
app.use(franchise); 


/**
 * @swagger
 * components:
 *  schemas:
 *   TypeSouvenir:
 *    type: object
 *    properties:
 *      id_type:
 *        type: interger
 *        description: type souvenir identifier --> Schema Identifier
 *      type:
 *        type: string
 *        description: type souvenir name
 *    required:
 *     - type
 *    example: 
 *     id_type: 1
 *     type: Gorras
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postTypeSouvenir:
 *     summary: post type souvenir
 *     value:
 *       type: Gorras
 */
app.use(type_souvenir); 


/**
 * @swagger
 * components:
 *  schemas:
 *   Figure:
 *    type: object
 *    properties:
 *      id_figure:
 *        type: interger
 *        description: figure identifier --> Schema Identifier
 *      name:
 *        type: string
 *        description: figure name
 *      description:
 *        type: string
 *        description: figure description
 *      price:
 *        type: number
 *        description: figure price
 *      image_url:
 *        type: string
 *        format: url
 *        description: figure image url
 *      id_category:
 *        type: interger
 *        description: category identifier 
 *      id_state:
 *        type: interger
 *        description: state identifier
 *      id_franchise:
 *        type: interger
 *        description: franchise identifier
 *    required:
 *     - name
 *     - price
 *     - image_url
 *    example: 
 *     id_figure: 1
 *     name: Naruto Shippuden G.E.M. Series NARUTO UZUMAKI Sage Mode
 *     description: Figura de Naruto Uzumaki representado en modo sabio, el protagonista de la serie de manga y anime Naruto Shippuden, fabricada por Megahouse para su colección G.E.M. Series con la más alta calidad de modelado y pintado y 19 cm de altura.
 *     price: 184,90
 *     image_url: https://www.megaotaku.com/45426-medium_default/naruto-shippuden-gem-series-naruto-uzumaki-sage-mode-ver.jpg
 *     id_category: 1
 *     id_state: 1
 *     id_franchise: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postFigure:
 *     summary: post figure
 *     value:
 *       name: Naruto Shippuden G.E.M. Series NARUTO UZUMAKI Sage Mode
 *       description: Figura de Naruto Uzumaki representado en modo sabio, el protagonista de la serie de manga y anime Naruto Shippuden, fabricada por Megahouse para su colección G.E.M. Series con la más alta calidad de modelado y pintado y 19 cm de altura.
 *       price: 184.90
 *       image_url: https://www.megaotaku.com/45426-medium_default/naruto-shippuden-gem-series-naruto-uzumaki-sage-mode-ver.jpg
 *       id_category: 1
 *       id_state: 1
 *       id_franchise: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   getFigure:
 *     summary: get figure
 *     value:
 *       id_figure: 1
 *       name: Naruto Shippuden G.E.M. Series NARUTO UZUMAKI Sage Mode
 *       description: Figura de Naruto Uzumaki representado en modo sabio, el protagonista de la serie de manga y anime Naruto Shippuden, fabricada por Megahouse para su colección G.E.M. Series con la más alta calidad de modelado y pintado y 19 cm de altura.
 *       price: 184.90
 *       image_url: https://www.megaotaku.com/45426-medium_default/naruto-shippuden-gem-series-naruto-uzumaki-sage-mode-ver.jpg
 *       category: { "id_category": 1, "category": "Anime" }
 *       state: { "id_state": 1, "state": "Bajo pedido" }
 *       franchise: { "id_franchise": 1, "franchise": "Naruto" }
 */
app.use(figure); 


/**
 * @swagger
 * components:
 *  schemas:
 *   Manga:
 *    type: object
 *    properties:
 *      id_manga:
 *        type: interger
 *        description: manga identifier --> Schema Identifier
 *      name:
 *        type: string
 *        description: manga name
 *      description:
 *        type: string
 *        description: manga description
 *      price:
 *        type: number
 *        description: manga price
 *      image_url:
 *        type: string
 *        format: url
 *        description: manga image url
 *      id_category:
 *        type: interger
 *        description: category identifier 
 *      id_state:
 *        type: interger
 *        description: state identifier
 *      id_franchise:
 *        type: interger
 *        description: franchise identifier
 *    required:
 *     - name
 *     - price
 *     - image_url
 *    example: 
 *     id_manga: 1
 *     name: Manga Naruto Uzumaki Shūeisha tomo 29 Naruto Shippuden Kishimoto
 *     description: Manga de Naruto Shippuden tomo 29 ¿¡Cuál será el destino final de Gaara!?, autor Masashi Kishimoto, distribuido por la editorial Shūeisha, tapa blanca.
 *     price: 44.90
 *     image_url: https://http2.mlstatic.com/D_NQ_NP_760264-MLC46903368878_072021-O.jpg
 *     id_category: 1
 *     id_state: 1
 *     id_franchise: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postManga:
 *     summary: post manga
 *     value:
 *       name: Manga Naruto Uzumaki Shūeisha tomo 29 Naruto Shippuden Kishimoto
 *       description: Manga de Naruto Shippuden tomo 29 ¿¡Cuál será el destino final de Gaara!?, autor Masashi Kishimoto, distribuido por la editorial Shūeisha, tapa blanca.
 *       price: 44.90
 *       image_url: https://http2.mlstatic.com/D_NQ_NP_760264-MLC46903368878_072021-O.jpg
 *       id_category: 1
 *       id_state: 1
 *       id_franchise: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   getManga:
 *     summary: get manga
 *     value:
 *       id_manga: 1
 *       name: Manga Naruto Uzumaki Shūeisha tomo 29 Naruto Shippuden Kishimoto
 *       description: Manga de Naruto Shippuden tomo 29 ¿¡Cuál será el destino final de Gaara!?, autor Masashi Kishimoto, distribuido por la editorial Shūeisha, tapa blanca.
 *       price: 44.90
 *       image_url: https://http2.mlstatic.com/D_NQ_NP_760264-MLC46903368878_072021-O.jpg
 *       category: { "id_category": 1, "category": "Anime" }
 *       state: { "id_state": 1, "state": "Bajo pedido" }
 *       franchise: { "id_franchise": 1, "franchise": "Naruto" }
 */
app.use(manga); 

/**
 * @swagger
 * components:
 *  schemas:
 *   Souvenir:
 *    type: object
 *    properties:
 *      id_souvenir:
 *        type: interger
 *        description: souvenir identifier --> Schema Identifier
 *      name:
 *        type: string
 *        description: souvenir name
 *      description:
 *        type: string
 *        description: souvenir description
 *      price:
 *        type: number
 *        description: souvenir price
 *      image_url:
 *        type: string
 *        format: url
 *        description: souvenir image url
 *      id_category:
 *        type: interger
 *        description: category identifier 
 *      id_state:
 *        type: interger
 *        description: state identifier
 *      id_franchise:
 *        type: interger
 *        description: franchise identifier
 *      id_type:
 *        type: interger
 *        description: type souvenir identifier 
 *    required:
 *     - name
 *     - price
 *     - image_url
 *    example: 
 *     id_souvenir: 1
 *     name: Gorra Naruto Shippuden Edición Especial Naruto Uzumaki
 *     description: Gorra 100% Original-Licenciada ,Naruto Shippuden  EDICION ESPECIAL, Gorra Naruto Uzumaki con caja de coleccion y proteccion en acabado brillante, Confeccion de alta calidad , Sticker y Hologramas de Autenticidad.
 *     price: 21.99
 *     image_url: https://static.wixstatic.com/media/694e5d_74fd09bb4f0a4b639c6d93fa83decf40~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg
 *     id_category: 1
 *     id_state: 1
 *     id_franchise: 1
 *     id_type: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postSouvenir:
 *     summary: post souvenir
 *     value:
 *       name: Gorra Naruto Shippuden Edición Especial Naruto Uzumaki
 *       description: Gorra 100% Original-Licenciada ,Naruto Shippuden  EDICION ESPECIAL, Gorra Naruto Uzumaki con caja de coleccion y proteccion en acabado brillante, Confeccion de alta calidad , Sticker y Hologramas de Autenticidad.
 *       price: 21.99
 *       image_url: https://static.wixstatic.com/media/694e5d_74fd09bb4f0a4b639c6d93fa83decf40~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg
 *       id_category: 1
 *       id_state: 1
 *       id_franchise: 1
 *       id_type: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   getSouvenir:
 *     summary: get souvenir
 *     value:
 *       id_souvenir: 1
 *       name: Gorra Naruto Shippuden Edición Especial Naruto Uzumaki
 *       description: Gorra 100% Original-Licenciada ,Naruto Shippuden  EDICION ESPECIAL, Gorra Naruto Uzumaki con caja de coleccion y proteccion en acabado brillante, Confeccion de alta calidad , Sticker y Hologramas de Autenticidad.
 *       price: 21.99
 *       image_url: https://static.wixstatic.com/media/694e5d_74fd09bb4f0a4b639c6d93fa83decf40~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg
 *       category: { "id_category": 1, "category": "Anime" }
 *       state: { "id_state": 1, "state": "Bajo pedido" }
 *       franchise: { "id_franchise": 1, "franchise": "Naruto" }
 *       type_souvenir: { "id_type": 1, "type": "Gorras" }
 */
app.use(souvenir); 


/**
 * @swagger
 * components:
 *  schemas:
 *   Comment:
 *    type: object
 *    properties:
 *      id_comment:
 *        type: interger
 *        description: comment identifier --> Schema Identifier
 *      comment:
 *        type: string
 *        description: comment on the article
 *      id_user:
 *        type: string
 *        format: uuid
 *        description: user identifier 
 *      id_figure:
 *        type: interger
 *        description: figure identifier
 *    required:
 *     - comment
 *     - id_user
 *     - id_figure
 *    example: 
 *     id_comment: 1
 *     comment: I really liked the figure, I have had it for a few months and it is still in excellent condition
 *     id_user: fbc4d031-eba4-4ae2-8a38-058ad8bb37e6
 *     id_figure: 1
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postComment:
 *     summary: post comment
 *     value:
 *       comment: I really liked the figure, I have had it for a few months and it is still in excellent condition
 *       id_user: fbc4d031-eba4-4ae2-8a38-058ad8bb37e6
 *       id_figure: 1
 */
app.use(comment); 