require("dotenv").config();

const express = require('express');

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username input for user
 *         password:
 *           type: string
 *           description: Password input for user
 *       example:
 *         username: admin
 *         password: admin
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication for user
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login for user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: authentication sucess
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  uid: 
 *                     type: string
 *                  userdisplay: 
 *                      type: string 
 *                  url_photo:
 *                      type: string 
 *                  token: 
 *                      type: string
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register for new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: registration success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  status: 
 *                     type: integer
 *                  message: 
 *                      type: string 
 *                  
 *       500:
 *         description: Some server error
 */

const { register, login } = require('../controllers/authContoller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = {
    routes: router
}