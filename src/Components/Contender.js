import { Component } from "react";

class Contender extends Component {
    constructor() {
        super();
        this.state = {
            nameInput: '',
            editView: false
        }
    }

    handleChange = (e) => {
        this.setState({ nameInput: e.target.value })
    }

    toggleEdit = () => {
        this.setState({ editView: !this.state.editView })
    }

    handleSubmit = (id) => {
        this.props.editNameFn(id, this.state.nameInput)
        this.toggleEdit();
    }

    render() {
        const { name, sprite, id } = this.props;
        return (
            !this.state.editView
                ? (
                    <div className="contender">
                        <img className="contender-sprite" src={sprite} alt={name} width="150px" />
                        <p className="z-index contender-name">{name}</p>
                        <div className="contender-btn-container z-index">
                            <div className="button-container pointer" id="edit-contender-button">
                                <svg className="contender-button" onClick={this.toggleEdit} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </div>
                            <div className="button-container pointer" id="delete-contender-button">
                                <svg className="contender-button" onClick={() => this.props.deleteContenderFn(id)} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="contender">
                        <img className="contender-sprite" src={sprite} alt={name} width="150px" />
                        <input className="z-index" value={this.state.nameInput} onChange={this.handleChange} placeholder={name} />
                        <div className="contender-btn-container z-index">
                            <button onClick={() => this.handleSubmit(id)}>SUBMIT</button>
                        </div>
                    </div>
                )
        )
    }
}

export default Contender;