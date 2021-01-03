
const Results = (props) => {
    const results = props.resultsList.map((e,i) => {
        return (
            <div key={i} className="results-box">
                <div className="results-winner results-item">
                    <p>WINNER</p>
                    <img src={e.winner.sprites.front_default} alt={e.name} />
                </div>
                <div className="results-loser results-item">
                    <p>LOSER</p>
                    <img src={e.loser.sprites.front_default} alt={e.name} />
                </div>
            </div>
        )
        
    }) 
    return (
        <section id="results-container">
            {results}
        </section>
    )
}

export default Results;