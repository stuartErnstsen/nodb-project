import { Component } from 'react';
import axios from 'axios';

class Battle extends Component {
    constructor() {
        super();
        this.state = {
            contender1: {},
            contender2: {},
            copyHp1: 0,
            copyHp2: 0,
            atkCount: 0,
            arenaSet: false,
            battleFinished: false
        }
    }

    toggleArenaSet = () => {
        this.setState({ arenaSet: !this.state.arenaSet })
    }

    createBattlePair = () => {
        const { contenders, deleteContenderFn } = this.props
        let rand1 = contenders[Math.floor(Math.random() * contenders.length)]
        let rand2 = contenders[Math.floor(Math.random() * contenders.length)]
        while (rand2 === rand1) {
            rand2 = contenders[Math.floor(Math.random() * contenders.length)]
        }
        axios.post('/api/battle', { poke1: rand1, poke2: rand2 })
            .then(res => {
                const { poke1, poke2 } = res.data
                this.setState({ contender1: poke1, contender2: poke2, copyHp1: poke1.stats[0].base_stat, copyHp2: poke2.stats[0].base_stat })
                deleteContenderFn(poke1.id)
                deleteContenderFn(poke2.id)
                this.toggleArenaSet()
            })
            .catch(err => console.log(err))
    }

    deleteBattlePair = () => {
        axios.delete('/api/battle')
            .then(() => this.setState({ contender1: {}, contender2: {} }))
            .catch(err => console.log(err))
    }

    fight = () => {
        const cont1 = this.state.contender1,
            cont2 = this.state.contender2,
            first = cont1.stats[5].base_stat >= cont2.stats[5].base_stat ? 1 : 2
        const tempCount = this.state.atkCount + 1
        this.setState({ atkCount: tempCount })
        if (cont1.stats[0].base_stat > 0 && cont2.stats[0].base_stat > 0) {
            if (first === 1) {
                console.log(tempCount)
                if (cont1.stats[5].base_stat >= cont2.stats[5].base_stat && tempCount % 2 === 1) {
                    cont2.stats[0].base_stat -= cont2.stats[0].base_stat - cont1.stats[1].base_stat / 4 >= 0
                        ? cont1.stats[1].base_stat / 4
                        : cont2.stats[0].base_stat
                } else {
                    cont1.stats[0].base_stat -= cont1.stats[0].base_stat - cont2.stats[1].base_stat / 4 >= 0
                        ? cont2.stats[1].base_stat / 4
                        : cont1.stats[0].base_stat
                }
                // if (cont1.stats[0].base_stat < 0) this.setState({})
            } else {
                console.log(tempCount)
                if (cont2.stats[5].base_stat >= cont1.stats[5].base_stat && tempCount % 2 === 1) {
                    cont1.stats[0].base_stat -= cont1.stats[0].base_stat - cont2.stats[1].base_stat / 4 >= 0
                        ? cont2.stats[1].base_stat / 4
                        : cont1.stats[0].base_stat
                } else {
                    cont2.stats[0].base_stat -= cont2.stats[0].base_stat - cont1.stats[1].base_stat / 4 >= 0
                        ? cont1.stats[1].base_stat / 4
                        : cont2.stats[0].base_stat
                }
                // if (cont1.stats[0].base_stat < 0) this.setState({})
            }
            this.setState({ contender1: cont1, contender2: cont2 })
            // if (this.state.copyHp1 > 0 && this.state.copyHp2 > 0) {
            //     if (cont1.stats[5].base_stat > cont2.stats[5].base_stat && atkCount % 2 === 1) {
            //         this.setState({ copyHp2: this.state.copyHp2 -= cont1.stats[1].base_stat });
            //     } else {
            //         this.setState({ copyHp1: this.state.copyHp1 -= cont2.stats[1].base_stat });
            //     }
            //     atkCount++;
            //     this.setState({ contender1: cont1, contender2: cont2 })
            // }
            // if (this.state.copyHp1 < 0 || this.state.copyHp2 < 0) {
            //     this.setState({ battleFinished: true })
            // }
        }
        if (cont1.stats[0].base_stat <= 0 || cont2.stats[0].base_stat <= 0) {
            this.setState({ battleFinished: true, atkCount: 0 })
        }
    }

    addResults = () => {
        const winner = this.state.contender1.stats[0].base_stat > 0 ? this.state.contender1 : this.state.contender2
        const loser = this.state.contender1.stats[0].base_stat > 0 ? this.state.contender2 : this.state.contender1
        this.props.addResultsFn({ winner: winner, loser: loser })

        this.setState({ arenaSet: false, battleFinished: false })
        this.deleteBattlePair()
    }


    render() {
        const { contender1, contender2 } = this.state
        return (
            <section id="battle-container">
                {this.state.arenaSet
                    ? (
                        <div id="battle-arena">
                            <div id="arena-contender1" className="arena-contender">
                                <h3>{contender1.name}</h3>
                                <img alt={contender1.name} src={contender1.sprites.back_default} />
                                <section className="stats">
                                    <div className="hp-main-container">
                                        <h3>HP:</h3>
                                        <div className="hp-bar-container">
                                            <div className="inner-hp-bar" style={{ width: `${Math.floor(contender1.stats[0].base_stat / this.state.copyHp1 * 350)}px` }}></div>
                                        </div>
                                    </div>
                                    {/* <p>HP: {contender1.stats[0].base_stat}/{Math.floor(contender1.stats[0].base_stat / this.state.copyHp1 * 100)}</p> */}
                                    {/* <p>ATK: {contender1.stats[1].base_stat}</p> */}
                                    {/* <p>SPD: {contender1.stats[5].base_stat}</p> */}
                                </section>
                            </div>
                            <h2>VS</h2>
                            <div id="arena-contender2" className="arena-contender">
                                <section className="stats">
                                    <div className="hp-main-container">
                                        <h3>HP:</h3>
                                        <div className="hp-bar-container">
                                            <div className="inner-hp-bar" style={{ width: `${Math.floor(contender2.stats[0].base_stat / this.state.copyHp2 * 350)}px` }}></div>
                                        </div>
                                    </div>
                                    {/* <p>HP: {contender2.stats[0].base_stat}</p>
                                    <p>ATK: {contender2.stats[1].base_stat}</p>
                                <p>SPD: {contender2.stats[5].base_stat}</p> */}
                                </section>
                                <img alt={contender2.name} src={contender2.sprites.front_default} />
                                <h3>{contender2.name}</h3>
                            </div>
                        </div>
                    ) : (
                        <div id="battle-arena">
                            <h2 id="battle-loading">Click below to add contenders to battle!</h2>
                        </div>
                    )}

                <footer id="battle-footer">
                    {this.state.arenaSet
                        ? (
                            this.state.battleFinished
                                ? <div id="results-button" className="battle-button pointer" onClick={this.addResults}>NEXT<br />FIGHT!</div>
                                : <div id="fight-button" className="battle-button pointer" onClick={this.fight}>FIGHT!</div>
                        ) : (
                            <svg onClick={this.createBattlePair} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle pointer" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path id="inner-svg" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        )}
                </footer>
            </section>
        )
    }
}

export default Battle;