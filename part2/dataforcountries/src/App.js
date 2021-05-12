import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Filter} from './components/Components';
import {Countries} from './components/Components';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(`${showAll}`.toLowerCase()))


    const handleFilter = (event) => {
      setShowAll(event.target.value)
    }


  return (
    <div>
      <Filter showAll={showAll} handleFilter={handleFilter} />
      <Countries countriesToShow={countriesToShow} showAll={showAll} />
    </div>
  );
};

export default App;
