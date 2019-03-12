import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import './CustomModal.css';

class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: "",
            password: ""
        };

        this.toggle = this.toggle.bind(this);
        this.handleRegisterUser = this.handleRegisterUser.bind(this);
        this.handleLoginUser = this.handleLoginUser.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleRegisterUser() {
        this.props.saveUser(this.state.username, this.state.password);
    }

    handleLoginUser() {
        this.props.handleAuthUser(this.state.username, this.state.password);
    }

    render() {
        return (
            <div style={{display:'inline-block'}}>
                <Button color={'info'} onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Inicio con email / Registro </ModalHeader>
                    <ModalBody>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><span role="img" aria-label="candado">@</span></InputGroupAddon>
                            <Input placeholder="username" onBlur={e => {
                                this.setState({
                                    username: e.target.value
                                })
                            }}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><span role="img" aria-label="candado">🔐</span></InputGroupAddon>
                            <Input placeholder="password" type={'password'} onBlur={e => {
                                this.setState({
                                    password: e.target.value
                                })
                            }}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <div className={"btns-container"}>
                            <Button color="success" onClick={this.handleLoginUser}>Iniciar Sesión</Button>
                            {this.props.loginWithGoogle}
                            <Button color="primary" onClick={this.handleRegisterUser}>Registrarse</Button>
                        </div>
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CustomModal;