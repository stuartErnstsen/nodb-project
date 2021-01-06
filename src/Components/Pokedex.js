import axios from 'axios';
import { Component } from 'react';

class Pokedex extends Component {
    constructor() {
        super();
        this.state = {
            pokemonList: [],
            types: ['', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon'],
            nameInput: '',
            type1Input: '',
            type2Input: '',
            currentPokemon: {},
            pokedexOpen: false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlePokedexSubmit = () => {
        const queryStr = `?type1=${this.state.type1Input}&type2=${this.state.type2Input}`
        axios.get(`/api/pokedex/${queryStr}`)
            .then(res => {

                console.log(res.data)
                this.setState({ pokemonList: res.data })
            })
            .catch(err => console.log(err))
    }

    togglePokedex = () => {
        this.setState({ pokedexOpen: !this.state.pokedexOpen })
    }

    handlePokedexDisplay = (pokemon) => {
        this.setState({ currentPokemon: pokemon })
    }

    emptyCurrentPokemon = () => {
        this.setState({ currentPokemon: {} })
    }

    render() {
        const selectType = this.state.types.map((e, i) => <option key={i} value={e}>{e}</option>)
        const filtered = this.state.pokemonList.map((e, i) => <div className="pointer" key={i} onClick={() => this.handlePokedexDisplay(e)}>{e.name}</div>)

        return (
            <div id="pokedex-container">
                <aside id="pokedex-device-container" onClick={this.togglePokedex}>
                    <div id="pokedex-circs">
                        <div id="blue" className="circ"></div>
                        <div id="red" className="circ"></div>
                        <div id="yellow" className="circ"></div>
                        <div id="green" className="circ"></div>
                    </div>
                    <div id="pokedex-title">
                        <h2>POKEDEX</h2>
                    </div>
                </aside>
                {this.state.pokedexOpen
                    ? (
                        <section id="pokedex-search-container">
                            <div id="pokedex-input">
                                <p>SEARCH BY TYPE:</p>
                                <label htmlFor="type1Input">Type 1:</label>
                                <select name="type1Input" id="type1" onChange={this.handleChange} className="type-input">
                                    {selectType}
                                </select>
                                <label htmlFor="type2Input">Type 2:</label>
                                <select name="type2Input" id="type2" onChange={this.handleChange} className="type-input">
                                    {selectType}
                                </select>
                                <button className="pointer" onClick={this.handlePokedexSubmit}>SUBMIT</button>
                            </div>
                            <div id="pokedex-display">
                                {this.state.currentPokemon.hasOwnProperty('name')
                                    ? (
                                        <div id="pokedex-current-pokemon">
                                            <div id="pokedex-pokemon-title">
                                                <h5>{this.state.currentPokemon.name}:</h5>
                                            </div>
                                            <div className="pokedex-stats">
                                                <div className="stats-container">
                                                    <p><span>HP:</span> {this.state.currentPokemon.stats[0].base_stat}</p>
                                                    <p><span>ATK:</span> {this.state.currentPokemon.stats[1].base_stat}</p>
                                                    <p><span>SPD:</span> {this.state.currentPokemon.stats[5].base_stat}</p>
                                                </div>
                                                <div className="stats-container">
                                                    <img className="pokedex-img" alt={this.state.currentPokemon.name} src={this.state.currentPokemon.sprites.front_default} />
                                                </div>
                                            </div>
                                            <button id="pokedex-pokemon-close" onClick={this.emptyCurrentPokemon}>x</button>
                                        </div>
                                    ) : (
                                        filtered
                                    )
                                }

                            </div>

                        </section>
                    ) : (
                        <div></div>
                    )
                }
                {
                    this.state.pokedexOpen
                        ? <div className="pokedex-toggle-button pointer" onClick={this.togglePokedex}>CLOSE POKEDEX</div>
                        : <div className="pokedex-toggle-button pointer" onClick={this.togglePokedex}>OPEN POKEDEX</div>
                }
            </div >
        )
    }
}

export default Pokedex;