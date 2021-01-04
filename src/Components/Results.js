import Result from "./Result"

const Results = (props) => {
    const results = props.resultsList.map((e, i) => {
        return (
            <Result key={i} winner={e.winner} loser={e.loser} />
        )
    })
    return (
        <section id="results-container">
            {results}
        </section>
    )
}

export default Results;