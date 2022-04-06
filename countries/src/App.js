import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState('');

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

  return (
    <div>
      find countries:{' '}
      <input onChange={(event) => setKeyword(event.target.value)} />
      {countries.map((country, index) => {
        return (
          <div key={index}>
            {countries.length <= 10 && <p>{country.name.common}</p>}
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
