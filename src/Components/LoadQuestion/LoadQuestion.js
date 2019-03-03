import React, {Component} from 'react';
import imgDescarga from '../../img/uploadImg.png';
import SendQueModal from '../SendQuestionModal/SendQuestionModal';
import {Container, Row, Col, Alert, Modal, Button} from 'react-bootstrap';
import FormData from 'form-data'
import axios from 'axios'
import {default as UUID} from "node-uuid"
import Loader from '../Loader/Loader';
import SnackBar from '../SnackBar/SnackBar';


const fontStyle = {
    color: 'black'
};

class LoadQuestion extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            show: false,
            img1: <img alt="" height="250" width="250" id="img1" src={imgDescarga}/>,
            img2: <img alt="" height="250" width="250" id="img2" src={imgDescarga}/>,
            title: "",
            defaultImgRoute: "../img/uploadImg.png",
            imgSToUpload: [],
            pathImgsUploadeds: [],
            question: {},
            loader: "",
            alert:""
        };
    }

    inputErrorStyle = () => {
        this.input.current.style.borderColor = "red";
    }

    cleanInput = () => {
        this.input.current.value = "";
        this.input.current.style.borderColor = "";
    }

    checkQuestion = () => {
        var verify = 0;
        verify = this.state.img1.props.src !== this.state.defaultImgRoute ? verify + 1 : verify;
        verify = this.state.img2.props.src !== this.state.defaultImgRoute ? verify + 1 : verify;
        verify = this.input.current.value !== "" ? verify + 1 : verify;
        verify = verify == 3 ? true : false;
        return verify;
    }


    resetQuestion = () => {
        const initialState = {
            question: "",
            img1: <img alt="" height="250" width="250" id="img1" src={imgDescarga}/>,
            img2: <img alt="" height="250" width="250" id="img2" src={imgDescarga}/>,
        };
        this.setState({
            img1: initialState['img1'],
            img2: initialState['img2'],
        });
        this.cleanInput();
    };


    handleInputQuestion = e => {
        this.setState({
            question: e.target.value
        });
    }

    readImage = e => {
        const that = this;
        const copyState = [...this.state.imgSToUpload];
        if (e.target.files[0]) {
            var reader = new FileReader();
            const imgName = e.target.name;

            reader.onload = function (e) {
                that.setState({
                    [imgName]: <img alt="" height="250" width="250" id={imgName} src={e.target.result}/>
                })
            };

            reader.readAsDataURL(e.target.files[0]);
            copyState.push(e.target.files[0]);
            this.setState({
                imgSToUpload: copyState
            })
        }
    };

    saveImage = () => {
        const copyState = this.state.imgSToUpload;
        const pathImgsUploadeds = [];
        const that = this;
        for (var i = 0; i < copyState.length; i++) {
            let data = new FormData();
            data.append('file', copyState[i], copyState[i].name);
            axios.post(`http://localhost:8080/api/imagen`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    console.log(response);
                    pathImgsUploadeds.push(response.data);
                }).catch((error) => {
                console.log(error);
            });
        }
        setTimeout(
            function () {
                this.setState({pathImgsUploadeds});
            }.bind(this),
            2000
        );
    };

    buildQuestionRequest = _ => {
        const that = this;
        if (this.checkQuestion) {
            if (this.state.imgSToUpload.length == 2) {
                this.setState({
                    loader: <Loader/>
                });
                this.handleClose();
                that.resetQuestion();
                this.saveImage();
            }
            setTimeout(
                function () {
                    if(that.state.pathImgsUploadeds[0] && that.state.pathImgsUploadeds[1] !== undefined) {
                        let Id = UUID.v4();
                        const model = {
                            "id": Id,
                            "pregunta": {
                                "id": Id,
                                "imgs": [
                                    {
                                        "alt": that.state.imgSToUpload[0].name,
                                        "path": that.state.pathImgsUploadeds[0].path,
                                        "votos": 0,
                                    },
                                    {
                                        "alt": that.state.imgSToUpload[1].name,
                                        "path": that.state.pathImgsUploadeds[1].path,
                                        "votos": 0,
                                    }
                                ],
                                "vecesRespondida": 0,
                                "enunciado": that.state.title,
                                "autor": localStorage.getItem('token')
                            }
                        };
                        axios.post(`http://localhost:8080/api/pregunta`, {model})
                            .then(res => {
                                console.log("pregunta subida con éxito");
                                console.log(model);
                                that.setState({
                                    loader: "",
                                    alert: <SnackBar SnackBar={"success"}/>
                                });
                            }).catch(res => {
                            that.setState({
                                alert: <SnackBar SnackBar={"error"}/>
                            });
                            console.log("error enviando la pregunta");
                        })
                    }
                    else{
                        that.setState({
                            alert:<SnackBar SnackBar={"error"}/>,
                            loader: ""
                        });
                    }}, 3000);
        }
    };

    handleClose = _ => {
        this.setState({show: false});
    };

    handleShow = _ => {
        this.setState({show: true});
    };

    render() {
        return (
            <Container>
                {this.state.loader}
                <Row>
                    <Col>
                        {this.state.alert}
                        <div id="preguntaContainer" className="col-12 mt-5 text-center">
                            <Alert variant="light">
                                <h2>Inserte una pregunta y dos imágenes como respuestas:</h2>
                            </Alert>
                            <form>
                                <div className="form-group">
                                    <input ref={this.input} onBlur={(e) => this.setState({title: e.target.value})}
                                           type="text" placeholder="Inserte pregunta aquí..."
                                           className="form-control"
                                           id="question"/>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                {this.state.img1}
                            </label>
                            <input id="file-input" onChange={this.readImage} name={"img1"} type="file"/>


                        </div>
                    </Col>
                    <Col>
                        <div className="col-sm text-center">
                            <Button variant="primary" onClick={this.handleShow}>
                                Enviar pregunta
                            </Button>

                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title style={fontStyle}>ALERTA</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={fontStyle}>¿Estás seguro de enviar la siguiente
                                    pregunta?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Cancelar
                                    </Button>
                                    <Button variant="primary" onClick={(e) => {
                                        this.buildQuestionRequest(e)
                                    }}>
                                        ¡Vamos allá!
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>

                    <Col>
                        <div className="image-upload">
                            <label htmlFor="file-input1">
                                {this.state.img2}
                            </label>
                            <input id="file-input1" onChange={this.readImage} name={"img2"} type="file"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default LoadQuestion;