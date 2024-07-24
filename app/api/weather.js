import axios from 'axios';

const API_KEY = "9ce687585f883463de2babfa49a3afd5";
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
