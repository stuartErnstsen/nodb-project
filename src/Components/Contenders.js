import { Component } from 'react';

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
        console.log(this.props.contenders)
        let contenderDisplay = this.props.contenders.map(poke => {
            return <div>{poke.name}</div> 
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
    }
}

export default Contenders;