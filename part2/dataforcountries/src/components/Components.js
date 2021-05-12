import React, { useState, useEffect } from "react";
import axios from 'axios';


const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
  };
  
  
  
  
const Weather = ({country}) => {
    console.log('country', country)
  
    const [weatherData, setWeatherData] = useState([])
  
  
    const access_key = process.env.REACT_APP_WEATHER_KEY
    
  
    useEffect(() => {
      
  
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${access_key}`)
    .then(response => {
      console.log(response.data)
      setWeatherData(response.data)
    }).catch(error => {
      console.log('error', error);
    })
    }, [country.capital, access_key])
  
    console.log('weatherData', weatherData)
    console.log('weatherData.length', weatherData.length)
  
    return (
      <>
      {(weatherData.length === 0) 
      ? null  
      : 
      <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weatherData.main.temp} celsius </p>
      <p>description: {weatherData.weather[0].description}</p>
      <p>wind: {weatherData.wind.speed}</p>
      </div>
      }
      
      </>
    )
  }
  
  // additional info
  const CountryInfo = ({country}) => {
  
    return (
      <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(languages => 
        <li key={languages.name}>{languages.name}</li>
        )
        }
      </ul>
      <img src={country.flag} alt="flag" style={{width:"200px"}} />
      <Weather country={country} />
      
      </>
    )
  }
  
export const Filter = ({showAll, handleFilter}) => {
    return <p>find countries <input value={showAll} onChange={handleFilter}/></p>
  
  }
  
  //displays country name and button
const Country = ({ country }) => {
    console.log('Countryprops', country)
    const [showCountry, setShowCountry] = useState(false)
  
    const toggleShow = () => {
      console.log('clicked', country)
      setShowCountry(!showCountry)
    }
    return (
    <>
      <li>{country.name} <Button onClick={toggleShow} text="show"/></li>
      {!showCountry ? null : <CountryInfo country={country}/>
  }
    </>
    )
  };
  
  //results of the filtering
export const Countries = ({countriesToShow, showAll}) => {
    
  
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
              <Country key={country.name} country={country}/>
            )}
          </ul>
      )
    
  }
  