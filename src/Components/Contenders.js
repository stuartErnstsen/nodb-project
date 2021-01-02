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
        const contenderDisplay = contenders.map((poke,i) => {
            const { name, id } = poke
            return <Contender 
                key={i} 
                name={name} 
                id={id} 
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
            <section id="contender-container">
                <h2 id='contender-container-title'>CONTENDERS</h2>
                {contenderDisplay.length > 0 
                ? (
                    contenderDisplay
                ) : (
                    <p>FFF</p>
                )}  
                {possibleContenders.length >0 &&
                 (
                    <aside>
                        <h3>ADD POKEMON BACK TO CONTENDERS:</h3>
                        <ul>
                            {possibleContenders}
                        </ul>
                        <button>ADD CONTENDER</button>
                    </aside>
                    
                 )} 
            </section>
            
        )
    }
}

export default Contenders;