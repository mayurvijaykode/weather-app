import React, { useState, useEffect } from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import axios from 'axios';

const APIKey = 'bde9d434aae08ecaf12cf048a0847bab';

export default function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const getWeatherDetails = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`
    );
    let json = await response.json();
    setWeather(json);
    console.log(weather);
  };

  const searchHandler = async () => {
    await getWeatherDetails();
  };

  return (
    <Container>
      <h1>Weather App</h1>
      <p>Get weather infomration of your desired location</p>

      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={searchHandler}>
            Search
          </Button>
        </Col>
      </Row>
      {/* {location} */}
    </Container>
  );
}
