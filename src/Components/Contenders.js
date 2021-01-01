import { Component } from 'react';
import Contender from './Contender'

class Contenders extends Component {
    constructor(){
        super();
        this.state = {
            contenderList: [],
            nameInput: ''
        }
    }


    handleChange = (e) => {
        this.setState({nameInput: e.target.value});
    }

    render() {
        const { pokemon, contenders } = this.props
        //Creates list of next 9 pokemon in the contender list, it does not show whole list!
        const contenderDisplay = contenders.slice(0, 9).map((poke,i) => {
            return <Contender 
                key={i} 
                name={poke.name} 
                id={poke.id} 
                sprite={poke.sprites.front_default} 
                editNameFn={this.props.editNameFn}
                deleteContenderFn={this.props.deleteContenderFn}
                />
        })
        //Creates a list of unused pokemon that are not currently in contender list
        //pokemon that have been removed from contenders get added to this list 
        const possibleContenders = pokemon.filter(e => !contenders.find(e2 => e.id === e2.id)).map((poke,index) => {
            return <li key={index} pokemon={poke} onClick={() => this.props.addContenderFn(poke)}>{poke.name}</li>
        })

        return (
            <section>
                <form>
                    <input type="text" value={this.state.nameInput} onChange={this.handleChange} />
                    <ul>
                        {possibleContenders}
                    </ul>
                    <button>ADD CONTENDER</button>
                </form>
                {contenderDisplay}
            </section>
            
        )
    }
}

export default Contenders;