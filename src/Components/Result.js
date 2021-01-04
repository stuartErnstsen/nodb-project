
const Result = (props) => {
    return (
        <div className="results-box">
            <div className="results-winner results-item">
                <p>WINNER</p>
                <img src={props.winner.sprites.front_default} alt={props.winner.name} />
            </div>
            <div className="results-loser results-item">
                <p>LOSER</p>
                <img src={props.loser.sprites.front_default} alt={props.loser.name} />
            </div>
        </div>
    )
}

export default Result;