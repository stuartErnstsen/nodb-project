import { Component } from 'react';
import Contenders from './Components/Contenders';
import Pokedex from './Components/Pokedex'
import Battle from './Components/Battle';
import Results from './Components/Results';
import {ReactComponent as PokemonLogo} from './pokemon-23.svg'
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pokemon: [],
      contenders: [],
      resultsList: []
    }
  }

  componentDidMount(){
    this.getAllPokemon();
  }

  getAllPokemon = () => {
    axios.get('/api/contenders')
      .then(res => this.setState({pokemon: res.data, contenders: res.data}))
      .catch(err => console.log(err))
  }

  editName = (id, name) => {
    axios.put(`/api/contenders/${id}`, {name: name})
    .then(res => {
      this.setState({contenders: res.data})
    })
    .catch(err => console.log(err))
  }

  deleteContender = (id) => {
    axios.delete(`/api/contenders/${id}`)
      .then(res => {
        this.setState({contenders: res.data})
      })
      .catch(err => console.log(err))
  }

  addContender = (poke) => {
    axios.post('/api/contenders', {pokemon: poke})
      .then(res => this.setState({contenders: res.data}))
      .catch(err => console.log(err))
  }

  addResults = (result) => {
    axios.post('/api/results', {winner: result.winner, loser: result.loser})
      .then(res =>{
        console.log(res.data)
        this.setState({resultsList: res.data})
      })
      .catch(err => console.log(err))
  }
  
  render(){
    return (
      <div className="App">
        <header><PokemonLogo /></header>
        <main>
          <Contenders 
            pokemon={this.state.pokemon}
            contenders={this.state.contenders}
            editNameFn={this.editName} 
            deleteContenderFn={this.deleteContender}
            addContenderFn={this.addContender}
          />
          <Pokedex />
          <Battle 
            contenders={this.state.contenders}
            deleteContenderFn={this.deleteContender}
            addResultsFn={this.addResults}
          />
          <Results resultsList={this.state.resultsList}/>
        </main>
      </div>
    );
  }
}

export default App;
