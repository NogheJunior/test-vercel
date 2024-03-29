/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt'); 

  
const sequelize = new Sequelize(
  'mydatabase_costpainus', 
  'mydatabase_costpainus', 
  '0f63ce63a5927904d1f740b71265492143dcbb8f', 
  {
    host: 'tcr.h.filess.io',
    port: 3305,
    dialect: 'mysql', 
    dialectModule: require('@myorg/tedious'),
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    }
  }
)

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('noghe', 10)
    .then(hash => {
      User.create({
        username: 'noghe', 
        password: hash
      })
    })
    .then(user => console.log(user.toJSON())) 

    console.log('La base de donnée a bien été initialisée !')
  })
} 
  
module.exports = { 
  initDb, Pokemon, User
}