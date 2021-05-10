import React, { useState, useEffect } from "react";
import axios from 'axios';


const Country = ({ country }) => {
  return <li >{country.name}</li>;
};

const CountryInfo = ({country}) => {
  return (
    <>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map(languages => 
      <li>{languages.name}</li>
      )
      }
    </ul>
    <img src={country.flag} alt="flag" style={{width:"200px"}} />

    </>
  )
}

const Filter = ({showAll, handleFilter}) => {
  return <p>find countries <input value={showAll} onChange={handleFilter}/></p>

}

const Countries = ({countriesToShow, showAll}) => {
  console.log("countriestoShow", countriesToShow)
  console.log("showall length", showAll.length)
  if (showAll.length === 0) {
    return null
  } else if
   (countriesToShow.length === 1) {
    return <CountryInfo country={countriesToShow[0]}/>
  } else if
   (countriesToShow.length > 3) {
    return "Too many matches, specify another filter"
  }
  return (
      <ul style={{listStyle:'none', padding:'0px'}}>
        {countriesToShow.map(country => 
            <Country key={country.name} country={country} />
          )}
        </ul>
    )
  
}

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

  console.log('render', countries.length, 'notes')
  console.log("showall", showAll)

  console.log("countries", countries)


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
