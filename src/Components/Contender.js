import { Component } from "react";

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
                <div className="contender">
                    <img className="contender-sprite" src={sprite} alt={name} width="150px"/>
                    <p className="z-index contender-name">{name}</p>
                    <div className="contender-btn-container z-index">
                        <button onClick={this.toggleEdit}>EDIT</button>
                        <button onClick={() => this.props.deleteContenderFn(id)}>DEL</button>
                    </div>
                </div>
            )
            : (
                <div className="contender">
                    <img className="contender-sprite" src={sprite} alt={name} width="150px"/>
                    <input className="z-index" value={this.state.nameInput} onChange={this.handleChange} placeholder={name}/>
                    <div className="contender-btn-container z-index">
                        <button onClick={() => this.handleSubmit(id)}>SUBMIT</button>
                    </div>
                </div>
            )
        )
    }
}

export default Contender;