import { Component } from 'react';
import Contenders from './Components/Contenders'
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      contenders: [],
      battlePair: [],
      resultsList: []
    }
  }

  componentDidMount(){
    this.getAllContenders();
  }

  getAllContenders = () => {
    axios.get('/api/contenders')
      .then(res => this.setState({contenders: res.data}))
      .catch(err => console.log(err))
  }
  
  render(){
    return (
      <div className="App">
        <header>BATTLE</header>
        <div>Temp for battle box</div>
        <section>TEMP FOR RESULTS</section>
        <Contenders contenders={this.state.contenders}/>
      </div>
    );
  }
}

export default App;
