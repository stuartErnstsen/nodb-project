import { Component } from 'react';
import Contenders from './Contenders';

class Battle extends Component {
    constructor(){
        super();
        this.state = {
            contender1: {},
            contender2: {}
        }
    }

    getBattlePair = () => {
        const { contenders, deleteContenderFn } = this.props
        const rand1 = Math.floor(Math.random() * contenders.length)
        const rand2 = Math.floor(Math.random() * contenders.length)
        this.setState({contender1: contenders[rand1], contender2: contenders[rand2]})
        deleteContenderFn(contenders[rand1].id)
        deleteContenderFn(contenders[rand2].id)
    }

    render() {
        return (
            <section id="battle-container">
                <div id="battle-arena">
                    <div id="arena-contender1" className="arena-contender">
                        <h3>NAME</h3>
                        <p>IMG</p>
                        <p>health</p>
                    </div>
                    <h2>VS</h2>
                    <div id="arena-contender2" className="arena-contender">
                        <h3>NAME</h3>
                        <p>IMG</p>
                        <p>health</p>
                    </div>
                </div>
                <footer id="battle-footer">
                    <button onClick={this.getBattlePair}>FIND PAIR OF CONTENDERS</button>
                </footer>
            </section>
        )
    }
}

export default Battle;