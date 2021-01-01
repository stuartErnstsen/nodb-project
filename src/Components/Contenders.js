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
        
        return (
            <section>
                <form>
                    <input type="text" value={this.state.nameInput} onChange={this.handleChange} />
                    <button>ADD CONTENDER</button>
                </form>
            </section>
            
        )
    }
}

export default Contenders;