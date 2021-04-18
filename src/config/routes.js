const express = require('express');
const route = express.Router();

const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const contactController = require('../controllers/contactController');

const { loginRequired } = require('../middlewares/middleware')

// Rotas da home
// homeController.index modulo que ira acessar
route.get('/', homeController.index)

// Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)


// Rotas de contact
route.get('/contact/index', loginRequired, contactController.index)
route.post('/contact/register', loginRequired, contactController.register)
route.get('/contact/index/:id', loginRequired, contactController.editIndex)
route.post('/contact/edit/:id', loginRequired, contactController.edit)
route.get('/contact/delete/:id', loginRequired, contactController.delete)


module.exports = route;
