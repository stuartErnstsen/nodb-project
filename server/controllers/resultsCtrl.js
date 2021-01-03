const resultsArr = []

module.exports = {
    addResults: (req, res) => {
        const {winner, loser} = req.body;
        resultsArr.unshift({winner: winner, loser: loser})
        res.status(200).send(resultsArr)
    }
}