const axios = require('axios')

module.exports = {
    getAllContenders: (req, res) => {
        let pokemonArr = [];
        let promises = [];
        for(let i=1;i<=20; i++){
            promises.push(
                axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(response => {
                        pokemonArr.push(response.data);
                    })
                    .catch(err => res.status(500).send(err))
            )
        }
        Promise.all(promises).then(() => res.status(200).send(pokemonArr))
    }
    // getAllContenders: (req, res) => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon`)
    //         .then(response => { 
    //             res.status(200).send(response.data.results)
    //         })
    //         .catch(err => res.status(500).send(err))
    // }
}