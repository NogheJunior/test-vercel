const express = require('express')
/* const morgan = require('morgan') */
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors') 

const app = express(); 
const port = process.env.PORT || 3000;

app
    app.use(favicon(path.join(__dirname, 'favicon.ico')))
    /*.use(morgan('dev')) */
    .use(bodyParser.json())
    .use(cors());

sequelize.initDb();

app.get('/', (req, res) => {
    res.json('hello, Vercel !'); 
})

/* Ici, nous placerons nos futurs points de terminaisons. */
require('./src/routes/findAllPokemons')(app); 
require('./src/routes/findPokemonByPk')(app); 
require('./src/routes/createPokemon')(app); 
require('./src/routes/updatePokemon')(app); 
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app)

/* On ajoute la gestion des erreurs 404 */
app.use(({res}) => {
    const message = 'Impossible de retrouver la ressource demandee !! Vous pouvez essayer une autre URL'; 
    res.status(404).json({message}); 
});

app.listen(port, () => console.log(`Notre application Node est demarree sur : http://localhost:${port}`)); 

module.exports = app; 