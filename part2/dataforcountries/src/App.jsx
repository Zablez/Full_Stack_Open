/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import Filtered from './components/Filter';

function App() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleChangeCountry = (event) => {
    setCountryName(event.target.value);

    if (countries.length > 0) {
      const regex = new RegExp(countryName, 'i');
      const filterdCountries = countries.filter((item) =>
        item.name.common.match(regex)
      );

      setFilteredCountries(filterdCountries);
    }
  };

  return (
    <>
      <div>
        find countries
        <input value={countryName} onChange={handleChangeCountry} />
      </div>
      <Filtered filteredCountries={filteredCountries} />
    </>
  );
}

export default App;
