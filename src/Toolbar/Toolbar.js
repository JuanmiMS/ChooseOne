import React, {Component} from 'react';
import {
    Collapse,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">

                    <a className="navbar-brand" href="#aqui">ChooseOne</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#aqui">Home <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="nav-item dropdown" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            DropDown
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Action
                                            </DropdownItem>
                                            <DropdownItem>
                                                Another action
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>
                                                Something else here
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            <strong>Nombre</strong>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <p className="text-left"><strong>Nombre Apellido</strong></p>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <p className="text-left small">correoElectronico@email.com</p>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <p className="text-left">
                                                    <a href="#aqui" className="btn btn-primary btn-block btn-sm">Actualizar
                                                        Datos</a>
                                                </p>
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem>
                                                <li>
                                                    <div className="navbar-login navbar-login-session">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <p>
                                                                    <a href="#aqui" className="btn btn-danger btn-block">Cerrar
                                                                        Sesion</a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Toolbar;