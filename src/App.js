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
  const [weatherImage, setWeatherImage] = useState('');
  let weatherHint = '';

  const getWeatherDetails = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`
    );
    let json = await response.json();
    setWeather(json);
  };

  const onSearch = () => {
    getWeatherDetails();
  };

  useEffect(() => {
    weatherHint = weather && weather?.weather[0].main;

    console.log(`for ${location} weather hint is ${weatherHint}`);

    switch (weatherHint) {
      case 'Clouds':
        setWeatherImage('fa-cloud-sun');
        break;
      case 'Clear':
        setWeatherImage('fa-sun');
        break;
      case 'Rain':
        setWeatherImage('fa-cloud-rain');
        break;
      case 'Snow':
        setWeatherImage('fa-snowflake');
        break;

      default:
        break;
    }
  }, [weather, location]);

  return (
    <main>
      <Container style={{ width: '500px' }}>
        <h1>Weather App</h1>
        <p>Get weather infomration of your desired location</p>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Enter location"
              onChange={(e) => {
                setLocation(e.target.value.toString());
                setWeather(null);
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
                  <i className={`fas icon ${weatherImage}`}> </i>
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
        {/* <code>
          {weatherImage}
          {weather && JSON.stringify(weather.weather, null, 2)}
        </code> */}
      </Container>
    </main>
  );
}
