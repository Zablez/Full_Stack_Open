/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = (props) => {
  const { filteredCountries } = props;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const params = {
      access_key: import.meta.env.VITE_SOME_KEY,
      query: filteredCountries.capital[0],
    };

    axios
      .get('http://api.weatherstack.com/current', { params })
      .then((response) => {
        const apiResponse = response.data;
        console.log(apiResponse);
        console.log(
          `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`
        );
        setWeather([apiResponse]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (weather.length > 0) {
    const currentWeather = weather[0].current;
    return (
      <div>
        <h3>{filteredCountries.name.common}</h3>

        <div>capital {filteredCountries.capital[0]}</div>
        <div>capital {filteredCountries.area}</div>

        <h4>Languages</h4>
        <ul>
          {Object.keys(filteredCountries.languages).map((key, index) => (
            <li key={index}>{`${filteredCountries.languages[key]}`}</li>
          ))}
        </ul>

        <img width={150} src={filteredCountries.coatOfArms.png} />

        <h2>Weather in {filteredCountries.capital[0]}</h2>
        <p>temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt='Weather icon'></img>
        <p>
          wind: {currentWeather.wind_speed} mph direction{' '}
          {currentWeather.wind_dir}
        </p>
      </div>
    );
  }
};

export default Country;
