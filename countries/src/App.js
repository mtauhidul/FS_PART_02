import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(null);
  const [temperature, setTemperature] = useState('');
  const [wind, setWind] = useState('');
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setData(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredCountries = data.filter((country) =>
      country.name.common.toLowerCase().includes(keyword.toLowerCase())
    );
    setCountries(filteredCountries);
    if (keyword === '') {
      setCountries([]);
    }
  }, [countries, keyword]);

  const getIcon = (code) => {
    axios
      .get(`http://openweathermap.org/img/wn/${code}@2x.png`)
      .then((response) => {
        setIcon(response.config.url);
      });
  };

  const getWeather = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response);
        const fTemp = response.data.main.temp;
        const cTemp = Math.round(fTemp - 273.15);
        setTemperature(cTemp);
        setWind(response.data.wind.speed);
        getIcon(response.data.weather[0].icon);
      });
  };

  const handleShow = (name) => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        const { lat, lon } = response.data[0];
        getWeather(lat, lon);
      });

    setShow(name);
  };

  return (
    <div>
      find countries:{' '}
      <input onChange={(event) => setKeyword(event.target.value)} />
      {countries.map((country, index) => {
        return (
          <div key={index}>
            {countries.length <= 10 && (
              <div>
                <p>
                  {country.name.common}{' '}
                  <button onClick={() => handleShow(country.capital)}>
                    show
                  </button>
                </p>
                <div>
                  {show === country.capital && (
                    <div>
                      <p>capital {country.capital}</p>
                      <p>area {country.area}</p>
                      <img src={country.flags.png} alt='flag' />
                      <p>temperature {temperature}°C</p>
                      <img src={icon} alt='icon' />
                      <p>wind {wind} m/s</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {countries.length === 1 && (
              <div>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <img src={country.flags.png} alt='flag' />
              </div>
            )}
          </div>
        );
      })}
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
    </div>
  );
};

export default App;
