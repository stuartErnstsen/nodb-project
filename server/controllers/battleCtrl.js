const axios = require('axios');
let pair = {}

module.exports = {

    createPair: (req, res) => {
        const { poke1, poke2 } = req.body
        pair = {poke1: poke1, poke2: poke2}
        res.status(200).send(pair)
    }
}