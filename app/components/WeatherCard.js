import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
  FaTint,
  FaWind,
  FaCompressArrowsAlt,
  FaEye,
  FaCloudSun,
  FaClock,
  FaMapMarkerAlt
} from 'react-icons/fa';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const condition = weather.weather[0].main.toLowerCase();

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'clear':
        return <FaSun className="text-4xl" />;
      case 'rain':
        return <FaCloudRain className="text-4xl" />;
      case 'clouds':
        return <FaCloud className="text-4xl" />;
      case 'snow':
        return <FaSnowflake className="text-4xl" />;
      case 'mist':
        return <FaSmog className="text-4xl" />;
      default:
        return <FaSun className="text-4xl" />;
    }
  };

  const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getTextColorClass = (condition) => {
    switch (condition) {
      case 'clear':
        return 'text-yellow-800';
      case 'rain':
        return 'text-blue-800';
      case 'clouds':
        return 'text-gray-800';
      case 'snow':
        return 'text-blue-800';
      case 'mist':
        return 'text-gray-1000';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={`p-4 bg-opacity-40 bg-black backdrop-filter backdrop-blur-lg rounded-lg shadow-lg ${getTextColorClass(condition)} w-full max-w-4xl`}>
      <div className="flex justify-between text-center mb-1 ">
        <span>
        <h2 className="text-base font-bold mb-2 flex items-center justify-start">
          <FaMapMarkerAlt className="mr-2 text-base" />
          {weather.name}, {weather.sys.country}
        </h2>
        <span className="flex items-start mb-2">
          <div className="flex justify-start items-start mb-4">
            {getWeatherIcon(condition)}
            <span className="text-3xl font-bold ml-2">
              {weather.main.temp}°C
            </span>
          </div>
        </span>
        </span>
        <div className="  rounded-lg flex justify-between text-center items-center ">
          
          <div className="px-2 flex ">
          <FaCompressArrowsAlt className="text-sm bottom-1 text-center"/>
            <span className="text-sm font-semibold">Feels Like</span>
            <span className="text-sm font-bold">{weather.main.feels_like}°C</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaTint className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Humidity</span>
            <span className="text-xl font-bold">{weather.main.humidity}%</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaWind className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Wind Speed</span>
            <span className="text-xl font-bold">{weather.wind.speed} m/s</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaCompressArrowsAlt className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Pressure</span>
            <span className="text-xl font-bold">{weather.main.pressure} hPa</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaEye className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Visibility</span>
            <span className="text-xl font-bold">{weather.visibility} m</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaCloudSun className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Cloudiness</span>
            <span className="text-xl font-bold">{weather.clouds.all}%</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaClock className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Sunrise</span>
            <span className="text-xl font-bold">{formatTime(weather.sys.sunrise)}</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <FaClock className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Sunset</span>
            <span className="text-xl font-bold">{formatTime(weather.sys.sunset)}</span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-800 rounded-lg flex items-center justify-between col-span-2">
          <FaCloud className="text-3xl" />
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">Description</span>
            <span className="text-xl font-bold capitalize">{weather.weather[0].description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
