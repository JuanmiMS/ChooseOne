import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const fontStyle = {
  color: 'black'
};

export default class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      firstImage: "",
      secondImage: "",
      title: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.firstImage);
    console.log(this.props.secondImage);
    console.log(this.props.title);

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
      <>
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
      </>
    );
  }
}
