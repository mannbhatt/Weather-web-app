"use client";

import { useState, useEffect } from 'react';
import { getWeather } from '../app/api/weather'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
  FaTint,
  FaWind,
  FaMapMarkerAlt,
  FaClock,
  FaCloudSun
} from 'react-icons/fa';
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

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'clear':
        return <FaSun className="text-6xl md:text-8xl" />;
      case 'rain':
        return <FaCloudRain className="text-6xl md:text-8xl" />;
      case 'clouds':
        return <FaCloudSun className="text-6xl md:text-8xl" />;
      case 'snow':
        return <FaSnowflake className="text-6xl md:text-8xl" />;
      case 'mist':
        return <FaSmog className="text-6xl md:text-8xl" />;
      default:
        return <FaSun className="text-6xl md:text-8xl" />;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-black p-2 bg-main`}>
      <div className={`${backgroundClass} bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4 py-0 w-full max-w-6xl text-white`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-0">
          
          <div className="flex flex-col justify-between p-6 pb-4 md:w-2/3">
            <h3 className="text-center md:text-left text-2xl md:text-3xl font-bold mb-2">Weather.io</h3>
            {weather && (
              <>
                <div className="flex flex-col items-center">
                  {getWeatherIcon(weather.weather[0].main.toLowerCase())}
                  <h2 className="text-6xl md:text-8xl font-bold ml-4">{weather.main.temp}°</h2>
                </div>
                <div className=' flex flex-col md:flex-row items-center justify-center'>
                  <p className="text-2xl font-light mt-1 mr-2">{weather.name}</p>
                  <p className="text-xl capitalize mt-1">{weather.weather[0].description}</p>
                </div>
                <div className="flex justify-between mt-4 text-center md:text-left">
                  <span>
                    <FaMapMarkerAlt className="inline-block mr-2" />
                    {weather.name}, {weather.sys.country}
                  </span>
                  <span>
                    <FaClock className="inline-block mr-2" />
                    {new Date(weather.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </>
            )}
          </div>
          
          <div className="bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-2xl border-transparent shadow-6xl p-4 rounded-lg w-full md:w-1/3 flex flex-col space-y-2 mt-4 md:mt-0">
            <div className="relative mb-3 w-full">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-3 pl-12 bg-transparent border-b-2 border-white outline-none placeholder-gray-300 placeholder-opacity-50 rounded-sm"
                placeholder="Enter city name"
              />
              <button
                onClick={handleSearch}
                className="absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <FontAwesomeIcon icon={faSearch} className="text-white" />
              </button>
            </div>
            {error && (
              <p className="text-white font-semibold text-lg mb-4">
                {error}
              </p>
            )}
            {weather && (
              <>
                <h3 className="text-xl mb-2">Weather Details</h3>
                <div className="flex justify-between">
                  <span>Cloudy</span>
                  <span>{weather.clouds.all}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Humidity</span>
                  <span>{weather.main.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Wind</span>
                  <span>{weather.wind.speed} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Rain</span>
                  <span>{weather.rain ? weather.rain["1h"] : 0} mm</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
