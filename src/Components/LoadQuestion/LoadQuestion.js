import React, {Component} from 'react';
import imgDescarga from '../../img/uploadImg.png';
import SendQueModal from '../SendQuestionModal/SendQuestionModal';
import { Container, Row, Col, Alert,Modal, Button  } from 'react-bootstrap';
import FormData from 'form-data'
import axios from 'axios'
import {default as UUID} from "node-uuid"


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
            img2: <img  alt="" height="250" width="250" id="img2" src={imgDescarga}/>,
            title: "",
            defaultImgRoute: "../img/uploadImg.png",
            imgSToUpload:[],
            pathImgsUploadeds:[],
            question: {

            }
        };
    }

    inputErrorStyle = () => {
        this.input.current.style.borderColor = "red";
    }

    cleanInput= () => {
        this.input.current.value = "";
        this.input.current.style.borderColor = "";
    }

    checkQuestion= () => {
        var verify = 0;
        verify = this.state.img1.props.src !== this.state.defaultImgRoute ? verify + 1  : verify;
        verify = this.state.img2.props.src !== this.state.defaultImgRoute ? verify + 1 : verify;
        verify = this.input.current.value !== "" ? verify + 1: verify;
        verify = verify == 3 ? true:false;
        return verify;
    }


    resertQuestion= () => {
        const initialState = {
            question: "",
            img1: <img  alt="" height="250" width="250" id="img1" src={imgDescarga}/>,
            img2: <img  alt="" height="250" width="250" id="img2" src={imgDescarga}/>,
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
                    [imgName]: <img  alt="" height="250" width="250" id={imgName} src={e.target.result}/>
                })
            };

            reader.readAsDataURL(e.target.files[0]);
            copyState.push(e.target.files[0]);
            this.setState({
                imgSToUpload:copyState
            })
        }
        if(copyState.length == 2) {
            that.saveImage(copyState);
        }
    }

    saveImage = (copyState) => {
        const pathImgsUploadeds = [];
        for(var i=0; i<copyState.length;i++) {
            let data = new FormData(); 
            data.append('file', copyState[i],copyState[i].name);
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
                //handle error
                console.log(error);
            });
        }
        setTimeout(
            function() {
                this.setState({pathImgsUploadeds});
            }.bind(this),
            3000
        );
    }

    buildQuestionRequest = () => {
        if(this.checkQuestion) {
            let Id = UUID.v4();
            const model = {
                "id" : Id,
                    "pregunta" : {
                    "id" : Id,
                    "imgs": [
                        {
                            "alt": this.state.imgSToUpload[0].name,
                            "path": this.state.pathImgsUploadeds[0].path,
                            "votos" : 0,
                        },
                        {
                            "alt": this.state.imgSToUpload[1].name,
                            "path":  this.state.pathImgsUploadeds[1].path,
                            "votos" : 0,
                        }
                    ],
                    "vecesRespondida": 0,
                    "enunciado": this.state.title,
                    "autor": localStorage.getItem('token')
                }
            }
            axios.post(`http://localhost:8080/api/pregunta`, { model })
                .then(res => {
                    console.log("pregunta subida con éxito");
                }).catch( res => {
                    console.log("error enviando la pregunta");
                })
        }
    }
    
      handleClose = _ => {
        this.setState({ show: false });
      }
    
      handleShow = _ => {
        this.setState({ show: true });
      }

    render() {
        return (
        <Container>
            <Row>
                <Col>
                    <div id="preguntaContainer" className="col-12 mt-5 text-center">
                        <Alert variant="light"> 
                            <h2>Inserte una pregunta y dos imágenes como respuestas:</h2>
                        </Alert>
                        <form>
                            <div className="form-group">
                                <input ref={this.input} onBlur={(e) => this.setState({title:e.target.value})} type="text" placeholder="Inserte pregunta aquí..."
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
                    <Modal.Body style={fontStyle}>¿Estás seguro de enviar la siguiente pregunta?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.buildQuestionRequest}>
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