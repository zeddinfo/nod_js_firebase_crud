const express = require('express');
const { addNews, getNews, detailNews
} = require('../controllers/newsController');
const { authenticateToken } = require('../helpers/jwt');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: Title for News
 *         description:
 *           type: string
 *           description: Description for news
 *         image:
 *            type: string 
 *            description: base 64 / string to upload image
 *       example:
 *         title: Indonesia Bisa
 *         description: Indonesia akan menjadi negara yang maju
 *         image: ddaeedCXsDD
 */

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Api Documentation for News
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get All Data
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: success get news data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                  $ref: '#/components/schemas/News'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Add new News data
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: success get news data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                  status:
 *                      type: integer
 *                  message: 
 *                      type: string
 *                      
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: get detail user
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: success get news data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                  status:
 *                      type: integer
 *                  message: 
 *                      type: string
 *                  data: 
 *                       type: object
 *                       properties: 
 *                          title: 
 *                              type: string
 *                          description:
 *                              type: string 
 *                          image: 
 *                              type: string
 *                      
 *       500:
 *         description: Some server error
 */

router.get('/news', authenticateToken, getNews);
router.post('/news', authenticateToken, addNews);
router.get('/news/:id', authenticateToken, detailNews);

module.exports = {
    routes: router
}