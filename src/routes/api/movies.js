const express = require('express');
const router = express.Router();
const moviesAPIController = require('../../controllers/api/moviesAPIController');

//Rutas
//Listado de películas
router.get('/', moviesAPIController.list);
//Detalle de una película
router.get('/:id', moviesAPIController.detail);
//Filtrar películas por rating. Puede colocar desde 1 hasta 10
router.get('/recommended/:rating', moviesAPIController.recommended);
//Buscar películas por título
router.get('/search/:title', moviesAPIController.search);
//Agregar una película
router.post('/create', moviesAPIController.create);
//Modificar una película
router.put('/update/:id', moviesAPIController.update);
//Eliminar una película
router.delete('/delete/:id', moviesAPIController.destroy);

module.exports = router;