"use client";

import { useState, useEffect } from 'react';
import { getWeather } from '../app/api/weather'; 
import WeatherCard from '../app/components/WeatherCard'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './globals.css';

const getBackgroundClass = (weather) => {
  if (!weather) return 'bg-default';

  const condition = weather.weather[0].main.toLowerCase();
  switch (condition) {
    case 'clear':
      return 'bg-sunny';
    case 'rain':
      return 'bg-rainy';
    case 'clouds':
      return 'bg-cloudy';
    case 'snow':
      return 'bg-snowy';
    case 'mist':
      return 'bg-mist';
    default:
      return 'bg-default';
  }
};

const getTextColorClass = (weather) => {
  if (!weather) return 'text-white';

  const condition = weather.weather[0].main.toLowerCase();
  switch (condition) {
    case 'clear':
      return 'text-gray-800 border-black'; 
    case 'rain':
      return 'text-gray-800 border-black'; 
    case 'clouds':
      return 'text-gray-800 border-black'; 
    case 'snow':
      return 'text-gray-800 border-black'; 
    case 'mist':
      return 'text-gray-1000 border-black'; 
    default:
      return 'text-white'; 
  }
};

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); 
  const handleSearch = async () => {
    setError(null); 
    try {
      const data = await getWeather(city);
      if (data && data.weather) {
        setWeather(data);
      } else {
        setError("City not found. Please try again.");
        setWeather(null);
      }
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      setWeather(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
  
    const fetchDefaultCityWeather = async () => {
      try {
        const defaultCity = 'New York'; 
        const data = await getWeather(defaultCity);
        setWeather(data);
      } catch (error) {
        setError("Error fetching default city weather data. Please try again.");
      }
    };

    fetchDefaultCityWeather();
  }, []);

 
  const backgroundClass = getBackgroundClass(weather);
  const textColorClass = getTextColorClass(weather);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${backgroundClass} p-4`}>
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 w-2/5 max-w-6xl  mx-auto text-center">
        <h1 className={`text-4xl font-bold mb-3 ${textColorClass}`}>Weather App</h1>
        <div className="relative mb-3">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`p-3 pl-12 bg-transparent border-b-2  outline-none ${textColorClass} font-bold placeholder-white placeholder-opacity-50 rounded-sm`}
            placeholder="Enter city name"
          />
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 left-12 flex items-center pl-3"
          >
            <FontAwesomeIcon icon={faSearch} className={textColorClass} />
          </button>
        </div>
        {error && (
          <p className={`${textColorClass} font-semibold text-lg mb-4`}>
            {error}
          </p>
        )}
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
};

export default Home;
