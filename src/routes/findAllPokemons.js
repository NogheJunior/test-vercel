const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if(req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5;
            
            if(name.length < 2) {
                const message = 'Le terme de recherche doit contenir au moins 2 caracteres'; 
                return res.status(400).json({message}); 
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: { // Nom de la propriete modele pokemon. 
                        [Op.like]: `%${name}%` // 'name' est le critere de la recherche
                    }
                }, 
                order: ['name'], 
                limit: limit
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}`; 
                return res.json({message, data: rows }); 
            })
        } else {
            Pokemon.findAll({ order: ['name'] })
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({ message, data: pokemons })
            })
            .catch(error => {
                const message = "La liste des pokémons n'a pas pu etre récupérée. Réessayer dans quelques instants."; 
                res.status(500).json({message, data: error}); 
            })
        }
    })
}