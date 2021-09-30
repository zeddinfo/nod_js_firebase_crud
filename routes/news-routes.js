const express = require('express');
const { addNews, getNews, detailNews
} = require('../controllers/newsController');
const { authenticateToken } = require('../helpers/jwt');

const router = express.Router();

router.get('/news', authenticateToken, getNews);
router.post('/news', authenticateToken, addNews);
router.get('/news/:id', authenticateToken, detailNews);

module.exports = {
    routes: router
}