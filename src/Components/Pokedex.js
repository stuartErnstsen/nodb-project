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
            pokedexOpen: false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handlePokedexSubmit = () => {
        const queryStr = `?type1=${this.state.type1Input}&type2=${this.state.type2Input}` 
        axios.get(`/api/pokedex/${queryStr}`)
            .then(res => {

                console.log(res.data)
                this.setState({pokemonList: res.data})
            })
            .catch(err => console.log(err))
    }

    togglePokedex = () => {
        this.setState({pokedexOpen: !this.state.pokedexOpen})
    }

    render() {
        const selectType = this.state.types.map((e,i) => <option key={i} value={e}>{e}</option>)
        const results = this.state.pokemonList.map((e,i) => <div key={i}>{e.name}</div>)

        return (
            <div id="pokedexContainer">
                {this.state.pokedexOpen
                ?   (
                    <section>
                        <p>Pokedex Open</p>
                        <label htmlFor="type1Input">Type 1:</label>
                        <select name="type1Input" id="type1" onChange={this.handleChange} className="type-input">
                            {selectType}
                        </select>    
                        <label htmlFor="type2Input">Type 2:</label>
                        <select name="type2Input" id="type2" onChange={this.handleChange} className="type-input">
                            {selectType}
                        </select>    
                        <button onClick={this.handlePokedexSubmit}>SUBMIT</button>
                        {results}
                    </section>
                ) : (
                    <div></div>
                )}
                <button onClick={this.togglePokedex}>OPEN/CLOSE</button>
            </div>
        )
    }
}

export default Pokedex;