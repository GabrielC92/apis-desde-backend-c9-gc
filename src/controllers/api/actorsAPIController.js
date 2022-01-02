const db = require('../../database/models');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const actorsAPIController = {
    'list': async (req, res) => {
        try{
            let actors = await db.Actor.findAll({
                include : ['movie']
            })
            let response = {
                meta: {
                    status: 200,
                    total: actors.length,
                    url: '/api/actors'
                },
                data: actors,
            }
            return res.status(200).json(response)
        } catch(error){
            return res.status(error.status || 500).json(error)
        }
    },
    'detail': async (req, res) => {
        try{
            let actor = await db.Actor.findByPk(req.params.id,{
                include : ['movie']
            })
            let response = {
                meta: {
                    status: 200,
                    total: actor.length,
                    url: '/api/actors/:id'
                },
                data: actor
            }
            return res.status(200).json(response)
            
        } catch(error) {
            return res.status(error.status || 500).json(error)
        }
    },
    'actorMovies': (req, res) => {
        db.Actor.findByPk(req.params.id,{
            include: ['movies']
        })
            .then(actor => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: actor.length,
                        url: '/api/actors/:id/movies'
                    },
                    data: actor
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    create: (req,res) => {
        Actors
        .create(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 201,
                        total: confirm.length,
                        url: '/api/actors/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: '/api/actors/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let actorId = req.params.id;
        Actors.update(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id,
            },
            {
                where: {id: actorId}
        })
        let actorUpdate = Actors.findByPk(actorId,{
            include : ['movie']
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: '/api/actors/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: '/api/actors/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let actorId = req.params.id;
        let actorDelete = Actors.findByPk(actorId,{
            include : ['movie']
        })
        Actors
        .destroy({where: {id: actorId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: '/api/actors/delete/:id'
                    },
                    data: actorDelete
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: '/api/actors/delete/:id'
                    },
                    data: actorDelete
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
}

module.exports = actorsAPIController;