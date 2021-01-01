import { Component } from 'react';
import Contender from './Contender'

class Contenders extends Component {
    constructor(){
        super();
        this.state = {
            nameInput: '',
        }
    }

    handleChange = (e) => {
        this.setState({nameInput: e.target.value});
    }

    render() {
        let {contenders} = this.props
        console.log(contenders[1])
        let contenderDisplay = contenders.map((poke,i) => {
            return <Contender 
                key={i} 
                name={poke.name} 
                id={poke.id} 
                sprite={poke.sprites.front_default} 
                editNameFn={this.props.editNameFn}
                deleteContenderFn={this.props.deleteContenderFn}
                />
        })
        return (
            <section>
                <form>
                    <input type="text" value={this.state.nameInput} onChange={this.handleChange} />
                    <button>ADD CONTENDER</button>
                </form>
                {contenderDisplay}
            </section>
            
        )
        // let contenderDisplay = contenders.map((user,i) => {
        //     return <Contender key={i} name={user.username} sprite={user.bike.images.main} />
        // })
        // return (
        //     <section>
        //         <form>
        //             <input type="text" value={this.state.nameInput} onChange={this.handleChange} />
        //             <button>ADD CONTENDER</button>
        //         </form>
        //         {contenderDisplay}
        //     </section>
            
        // )
    }
}

export default Contenders;