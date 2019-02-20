import React, {Component} from 'react';
import imgDescarga from '../../img/uploadImg.png';
import SendQueModal from '../SendQuestionModal/SendQuestionModal';
import { Container, Row, Col, Alert,Modal, Button  } from 'react-bootstrap';
import axios from 'axios'


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
            imgModuls:[],
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
        return verify;
    }

    addQuestions = _ => {

        for (let i = 0; i < 10; i++) {
            const model = {
                "id" : "notocar"+i,
                "pregunta" : {
                    "id" : "notocar"+i,
                    "imgs": [
                        {
                            "alt": "alt",
                            "path": "https://firebasestorage.googleapis.com/v0/b/chooseone-60d71.appspot.com/o/fotos%2F921319.jpg?alt=media&token=76c8a41f-ed00-4ccf-a61f-10c380f474b4",
                            "votos" : 0,
                        },
                        {
                            "alt": "alt2",
                            "path": "https://firebasestorage.googleapis.com/v0/b/chooseone-60d71.appspot.com/o/fotos%2F542652.jpg?alt=media&token=c21f7849-3128-42d7-b7dd-802fe9158d5a",
                            "votos" : 0,
                        }
                    ],
                    "vecesRespondida": 0,
                    "enunciado": "Esto es la prueba num "+i,
                    "autor": "RandomQuest"
                }
              };
    
              axios.post(`http://localhost:8080/api/pregunta`, { model })
              .then(res => {
                  
              }).catch( res => {
                  console.log("error enviando la pregunta");
              }
              )

        }
        alert("intenta no cagarla la próxima vez");
        
    }

    sendQuestion= () => {
        // if (this.checkQuestion() === 3) {
        if (true) {

            const model = {
                "id" : "notocar",
                "pregunta" : {
                    "imgs": [
                        {
                            "alt": "alt",
                            "path": "https://firebasestorage.googleapis.com/v0/b/chooseone-60d71.appspot.com/o/fotos%2F921319.jpg?alt=media&token=76c8a41f-ed00-4ccf-a61f-10c380f474b4",
                            "votos" : 0,
                        },
                        {
                            "alt": "alt2",
                            "path": "https://firebasestorage.googleapis.com/v0/b/chooseone-60d71.appspot.com/o/fotos%2F542652.jpg?alt=media&token=c21f7849-3128-42d7-b7dd-802fe9158d5a",
                            "votos" : 0,
                        }
                    ],
                    "vecesRespondida": 0,
                    "enunciado": "Esto es una prueba",
                    "autor": localStorage.getItem('token')
                }
              };

              axios.post(`http://localhost:8080/api/pregunta`, { model })
              .then(res => {
                alert("¡Pregunta enviada!");
                this.cleanInput();
                this.deleteQuestion();
              }).catch( res => {
                  console.log("error enviando la pregunta");
              }
              )
            
            
            


        }
        else{
            alert("Porfavor rellena todos los campos");
        }

    };


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
        const copyState = [...this.state.imgModuls];
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
                imgModuls:copyState
            })
        }
        if(copyState.length == 2 ){
            that.saveImage(copyState);
        }
    }

    saveImage = (copyState) => {
        const pathOfImages = [];
        let image1 = copyState[0];
        let image2 = copyState[1];
        axios.post(`http://localhost:8080/api/imagen`, { image1 })
        .then(res => {
        pathOfImages.push(res.path)
        console.log(res);
        }).catch(res => {
            console.log(res);
        })


        axios.post(`http://localhost:8080/api/imagen`, { image2 })
        .then(res => {
        pathOfImages.push(res.path)
        console.log(res);
        }).catch(res => {
            console.log(res);
        })
        console.log(pathOfImages);
    }

    enviarPregunta = _ => {
        const image = this.props.firstImage;
        axios.post(`http://localhost:8080/api/imagen`, { image })
          .then(res => {
            console.log(res);
          }).catch(res => {
            console.log(res);
          })
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
                        <Button variant="primary" onClick={this.enviarPregunta}>
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
                    <button type="button" className="btn btn-danger btn-lg mt-5"
                                onClick={this.addQuestions}>
                                Agregar/Resetear 10 preguntas
                    </button>
                </Col>
            </Row>
        </Container>
        )
    }

}

export default LoadQuestion;