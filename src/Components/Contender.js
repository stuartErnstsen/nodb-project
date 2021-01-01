import { Component } from "react";
import axios from 'axios';

class Contender extends Component {
    constructor(){
        super();
        this.state = {
            nameInput: '',
            editView: false
        }
    }

    handleChange = (e) => {
        this.setState({nameInput: e.target.value})
    }

    toggleEdit = () => {
        this.setState({editView: !this.state.editView})
    }

    handleSubmit = (id) => {
        this.props.editNameFn(id, this.state.nameInput)
        this.toggleEdit();
    }
    
    render() {
        const {name, sprite, id} = this.props;
        return (
            !this.state.editView 
            ? (
                <div>
                    <img src={sprite} alt={name} width="100px"/>
                    <p>{name}</p>
                    <button onClick={this.toggleEdit}>EDIT</button>
                    <button onClick={() => this.props.deleteContenderFn(id)}>DELETE</button>
                </div>
            )
            : (
                <div>
                    <img src={sprite} alt={name} width="100px"/>
                    <input value={this.state.nameInput} onChange={this.handleChange} placeholder={name}/>
                    <button onClick={() => this.handleSubmit(id)}>SUBMIT</button>
                </div>
            )
            // !this.state.editView 
            // ? (
            //     <div>
            //         <img src={sprite} alt={name} width="100px"/>
            //         <p>{name}</p>
            //         <button onClick={this.toggleEdit}>EDIT</button>
            //         <button>DELETE</button>
            //     </div>
            // )
            // : (
            //     <div>
            //         <img src={sprite} alt={name} width="100px"/>
            //         <input value={this.state.nameInput} onChange={this.handleChange} placeholder={name}/>
            //         <button onClick={() => this.handleSubmit(this.props.id)}>SUBMIT</button>
            //     </div>
            // )
        )
    }
}

export default Contender;