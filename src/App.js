import React from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default function App() {
  return (
    <Container>
      <h1>Weather App</h1>
      <p>Get weather infomration of your desired location</p>

      <Row>
        <Col>
          <Form.Control type="text" placeholder="Enter Location" />
        </Col>
        <Col>
          <Button variant="primary">Search</Button>
        </Col>
      </Row>
    </Container>
  );
}
