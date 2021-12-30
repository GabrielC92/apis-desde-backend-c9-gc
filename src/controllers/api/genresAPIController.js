const db = require('../../database/models');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const genresAPIController = {
    'list': async (req, res) => {
        try{
            let genres = await db.Genre.findAll()
            let response = {
                meta: {
                    status: 200,
                    total: genres.length,
                    url: '/api/genres'
                },
                data: genres,
            }
            return res.status(200).json(response)
        } catch(error){
            return res.status(error.status || 500).json(error)
        }
    },
    
    'detail': async (req, res) => {
        try{
            let genre = await db.Genre.findByPk(req.params.id)
            let response = {
                meta: {
                    status: 200,
                    total: genre.length,
                    url: '/api/genres/:id'
                },
                data: genre
            }
            return res.status(200).json(response)
        } catch(error) {
            return res.status(error.status || 500).json(error)
        }
    },
    'genreMovies': (req, res) => {
        db.Genre.findByPk(req.params.id,{
            include: ['movies']
        })
            .then(genre => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: genre.length,
                        url: '/api/genre/:id/movies'
                    },
                    data: genre
                }
                res.json(respuesta);
            })
            .catch(error => res.status(error.status || 500).json(error))
    }
}

module.exports = genresAPIController;