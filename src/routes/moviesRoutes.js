const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const moviesAddValidator = require('../validations/moviesAddValidator');
const moviesEditValidator = require('../validations/moviesEditValidator');

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recommended);
router.get('/detail/:id', moviesController.detail);
router.get('/search', moviesController.search);
//Rutas exigidas para la creación del CRUD
router.get('/add', moviesController.add);
router.post('/create', moviesAddValidator, moviesController.create);
router.get('/edit/:id', moviesController.edit);
router.put('/update/:id', moviesEditValidator, moviesController.update);
router.get('/delete/:id', moviesController.delete);
router.delete('/destroy/:id', moviesController.destroy);

router.post('/buscar', moviesController.buscar);
module.exports = router;