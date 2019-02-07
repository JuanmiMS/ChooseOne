import React, {Component} from 'react';
import {
    Button,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';
import CustomModal from '../CustomModal/CustomModal.js';
import firebase from 'firebase';
import axios from 'axios'
import notUserImg from '../img/notUserImg.png';


class ToolbarAuth extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            photoUrl: "",
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.renderSignInLayout = this.renderSignInLayout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.addImageToState = this.addImageToState.bind(this);
        this.handleUserImg = this.handleUserImg.bind(this);
        this.saveToken = this.saveToken.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    handleAuth(e) {
        const that = this;
        const provider = e.target.getAttribute('Provider') === "Google" ?
            new firebase.auth.GoogleAuthProvider() : new firebase.auth.EmailAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => that.saveToken(result.credential.idToken))
            .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
    }

    saveToken(token) {
        localStorage.setItem('token', token); //saving token in localStorage of browser
        axios.post('http://localhost:8080/api/auth', {data: token})
            .then(response => console.log(response)); //pass the token to the server
    }

    handleAuthWithEmail(email, password) {
        new firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => alert(error))
    }

    handleUserImg() {
        let urlPhoto = this.state.user.photoURL !== null ? this.state.user.photoURL : notUserImg;
        return (
            <img src={urlPhoto} alt={this.state.user.displayName}/>
        )
    }

    renderSignInLayout() {
        if (this.state.user) {
            return (
                <div id='contents'>
                    <h1>Hola {this.state.user.displayName}!</h1>
                    {this.handleUserImg()}
                    <div id="close-session">
                        <Button color="danger" onClick={this.handleLogout}>Cerrar Sesión</Button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div id={'preLogin'}>
                    <Nav>
                        <NavItem>
                            <CustomModal handleAuthUser={this.handleAuthUser} saveUser={this.handleAuthWithEmail}
                                         color="success"
                                         buttonLabel={"sign in / sign up"} loginWithGoogle={<Button color="success" provider={"Google"} onClick={this.handleAuth}> Login con
                                Google </Button>}/>
                        </NavItem>
                    </Nav>
                </div>
            )
        }
    }

    handleLogout() {
        firebase.auth().signOut();
    }

    handleAuthUser(email, password) {
        new firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => alert(error))
    }

    addImageToState(url) {
        this.setState({
            photoUrl: url
        })
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
                        {this.renderSignInLayout()}
                    </div>
                </div>
            </nav>
        );
    }
}

export default ToolbarAuth;