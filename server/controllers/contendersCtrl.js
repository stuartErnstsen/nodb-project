const axios = require('axios')
const pokemonArr = [];
let pokemonArrComplete = []
// const DATA = require('../../src/data')
// let id = 0;

module.exports = {
    getAllContenders: (req, res) => {
        let promises = [];
        for (let i = 1; i <= 10; i++) {
            promises.push(
                axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(response => {
                        pokemonArr.push(response.data);
                        pokemonArrComplete.push(response.data)
                    })
                    .catch(err => res.status(500).send(err))
            )
        }
        Promise.all(promises).then(() => {
            res.status(200).send(pokemonArr)
        })
    },
    editName: (req, res) => {
        const { id } = req.params,
            { name } = req.body
        const temp = pokemonArr.find(e => e.id === +id)
        temp.name = name;
        res.status(200).send(pokemonArr)
    },
    deleteContender: (req, res) => {
        const { id } = req.params;
        const index = pokemonArr.findIndex(e => e.id === +id)
        pokemonArr.splice(index, 1);
        res.status(200).send(pokemonArr);
    },
    addContender: (req, res) => {
        const { pokemon } = req.body
        pokemonArr.unshift(pokemon);
        res.status(200).send(pokemonArr);
    },

    getPokedexItem: (req, res) => {
        const { type1, type2 } = req.query
        const filteredArr = pokemonArrComplete.filter(e => {
            return e.types.some(el => el.type.name === type1 || !type1) && e.types.some(el2 => el2.type.name === type2 || !type2)
        })
        res.status(200).send(filteredArr)
    }
}