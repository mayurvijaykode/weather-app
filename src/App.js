import React, { useState, useEffect, useCallback } from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// import axios from 'axios';

const APIKey = 'bde9d434aae08ecaf12cf048a0847bab';

export default function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [cloud, setCloud] = useState(false);
  const [rain, setRain] = useState(false);
  const [clear, setClear] = useState(false);
  const [snow, setSnow] = useState(false);
  let weatherHint = '';

  const getWeatherDetails = async () => {
    console.info(location);
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`
    );
    let json = await response.json();
    // console.log(weather);
    setWeather(json);
    // console.log(weather);
  };

  const reset = () => {
    setClear(false);
    setCloud(false);
    setRain(false);
    setSnow(false);
  };

  const onSearch = () => {
    getWeatherDetails();
    weatherHint = weather && weather?.weather[0]?.main;

    switch (weatherHint) {
      case 'Clouds':
        reset();
        setCloud(true);
        break;
      case 'Clear':
        reset();
        setClear(true);
        break;
      case 'Rain':
        reset();
        setRain(true);
        break;
      case 'Snow':
        reset();
        setSnow(true);
        break;

      default:
        reset();
        setClear(true);
        break;
    }
  };

  return (
    <main>
      <Container style={{ maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center' }}>Weather App</h1>
        <p>Get weather infomration of your desired location</p>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter location"
              onChange={(e) => {
                setLocation(e.target.value.toString());
                setWeather(null);
                reset();
              }}
            />
          </Col>

          <Col>
            <Button variant="primary" onClick={onSearch}>
              Search
            </Button>
          </Col>
        </Row>

        {weather && weather.cod == '200' && (
          <section className="result">
            <Row>
              <Col xs="12">
                <div className="center">
                  {clear && <i className="fas fa-sun icon"></i>}
                  {rain && <i className="fas fa-cloud-rain icon"></i>}
                  {cloud && <i className="fas fa-cloud-sun icon"></i>}
                  {snow && <i className=" fas fa-snowflake icon"></i>}

                  <h1>
                    {Math.round(weather?.main?.temp)}
                    <span className="celsius1"> &#8451; </span>
                  </h1>
                </div>
              </Col>
              <Col>
                <Col>
                  <i className="fas fa-water"></i> <span>Humidity </span>
                </Col>
                <Col>{weather && <span>{weather?.main?.humidity}%</span>}</Col>
              </Col>
              <Col>
                <Col>
                  <i className="fas fa-wind"></i>
                  <span>Wind </span>
                </Col>
                <Col>
                  {' '}
                  <span>{weather?.wind?.speed} km/h</span>
                </Col>
              </Col>
            </Row>
          </section>
        )}

        {weather && weather.cod != '200' && (
          <section className="result">
            <Alert variant="danger">
              <p> City {location} not found! </p>
            </Alert>
          </section>
        )}
        {/* <code>{weather && JSON.stringify(weather, null, 2)}</code> */}
      </Container>
    </main>
  );
}
