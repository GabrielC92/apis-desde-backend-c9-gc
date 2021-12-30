const db = require('../../database/models');
const { Op } = require("sequelize");

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesAPIController = {
    'list': async (req, res) => {
        try {
            let movies = await db.Movie.findAll({
                include : ['genre']
            })
            let response = {
                meta: {
                    status: 200,
                    total: movies.length,
                    url: '/api/movies'
                },
                data: movies
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    },
    'detail': async (req, res) => {
        try {
            let movie = await db.Movie.findByPk(req.params.id,
                {
                    include : ['genre']
                })
            let response = {
                meta: {
                    status: 200,
                    total: movie.length,
                    url: '/api/movies/:id'
                },
                data: movie
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    },
    'recommended': async (req, res) => {
        try {
            let movies = await db.Movie.findAll({
                include: ['genre'],
                where: {
                    rating: {[Op.gte] : req.params.rating}
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            let response = {
                meta: {
                    status : 200,
                    total: movies.length,
                    url: '/api/movies/recommended/:rating'
                },
                data: movies
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    },
    search : async (req,res) => {
        try {
            let movie = await Movies.findAll({
                include: ['genre'],
                where: {
                    [Op.or]: [{
                        title: {
                            [Op.substring]: req.params.title
                        }
                    }]
                }
            })
            let response = {
                meta: {
                    status: 200,
                    total: movie.length,
                    url: '/api/movies/search/:title'
                },
                data: movie
            }
            return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    },
    create: async (req, res) => {
        try {
            let movieCreate = await Movies
                .create(
                    {
                        title: req.body.title,
                        rating: req.body.rating,
                        awards: req.body.awards,
                        release_date: req.body.release_date,
                        length: req.body.length,
                        genre_id: req.body.genre_id
                    }
                );
            let response;
            if (movieCreate) {
                response = {
                    meta: {
                        status: 201,
                        total: movieCreate.length,
                        url: '/api/movies/create'
                    },
                    data: movieCreate
                }
            }else{
                response = {
                    meta: {
                        status: 204,
                        total: movieCreate.length,
                        url: '/api/movies/create'
                    },
                    data: movieCreate
                }
            }
            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            let movieId = req.params.id;
            let update = await Movies
                .update(
                    {
                        title: req.body.title,
                        rating: req.body.rating,
                        awards: req.body.awards,
                        release_date: req.body.release_date,
                        length: req.body.length,
                        genre_id: req.body.genre_id
                    },
                    {
                        where: { id: movieId }
                    });
            let movieUpdate = await Movies.findByPk(movieId,{
                include : ['genre']
            })
            let response;
            if (update) {
                response = {
                    meta: {
                        status: 200,
                        total: update.length,
                        url: '/api/movies/update/:id'
                    },
                    data: movieUpdate
                }
            }else{
                response ={
                    meta: {
                        status: 204,
                        total: update.length,
                        url: '/api/movies/update/:id'
                    },
                    data: movieUpdate
                }
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    },
    destroy: async (req, res) => {
        try {
            let movieId = req.params.id;
            let movieDelete = await Movies.findByPk(movieId,{
                include : ['genre']
            })
            let confirm = await Movies
                .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
            let response;
            if(confirm){
                response ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: '/api/movies/delete/:id'
                    },
                    data: movieDelete
                }
            }else{
                response ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: '/api/movies/delete/:id'
                    },
                    data: movieDelete
                }
            }
            return res.status(202).json(response);
        } catch (error) {
            return res.status(error.status || 500).json(error);
        }
    }
}

module.exports = moviesAPIController;