import { Component } from 'react';
import axios from 'axios';

class Battle extends Component {
    constructor(){
        super();
        this.state = {
            contender1: {},
            contender2: {},
            arenaSet: false
        }
    }

    toggleArenaSet = () => {
        this.setState({arenaSet: !this.state.arenaSet})
    }

    createBattlePair = () => {
        const { contenders, deleteContenderFn } = this.props
        const rand1 = contenders[Math.floor(Math.random() * contenders.length)]
        const rand2 = contenders[Math.floor(Math.random() * contenders.length)]
        axios.post('/api/battle', {poke1: rand1, poke2: rand2})
            .then(res => {
                const {poke1, poke2} = res.data
                this.setState({contender1: poke1, contender2: poke2})
                deleteContenderFn(poke1.id)
                deleteContenderFn(poke2.id)
                this.toggleArenaSet()
            })
            .catch(err => console.log(err))    
    }

    render() {
        const {contender1, contender2} = this.state
        return (
            <section id="battle-container">
                {this.state.arenaSet
                ? (
                    <div id="battle-arena">
                    <div id="arena-contender1" className="arena-contender">
                        <h3>{contender1.name}</h3>
                        <img alt={contender1.name} src={contender1.sprites.back_default}/>
                        <p>{contender1.stats[0].base_stat}</p>
                    </div>
                    <h2>VS</h2>
                    <div id="arena-contender2" className="arena-contender">
                        <h3>{contender2.name}</h3>
                        <img alt={contender2.name} src={contender2.sprites.front_default}/>
                        <p>{contender2.stats[0].base_stat}</p>
                    </div>
                    </div>
                ) : (
                    <h2 id="battle-loading">LOADING...</h2>
                )}
                
                <footer id="battle-footer">
                    <button onClick={this.createBattlePair}>FIND PAIR OF CONTENDERS</button>
                </footer>
            </section>
        )
    }
}

export default Battle;