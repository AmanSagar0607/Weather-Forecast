import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { WiRaindrop, WiThermometer, WiSunrise, WiSunset, WiWindDeg, WiDaySunny, WiBarometer, WiStrongWind, WiHumidity, WiRaindrops } from 'react-icons/wi';
import { FaEye } from 'react-icons/fa';

function WeatherDisplay({ weatherData, unit }) {
  const [hourlyData, setHourlyData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (weatherData && weatherData.forecast && weatherData.forecast.forecastday) {
      const hourlyData = weatherData.forecast.forecastday[0].hour;
      const data = hourlyData.map(hour => ({
        time: new Date(hour.time),
        temp: unit === 'C' ? hour.temp_c : hour.temp_f,
        condition: hour.condition.text,
        icon: hour.condition.icon,
        chanceOfRain: hour.chance_of_rain,
      }));
      setHourlyData(data);
    }
  }, [weatherData, unit]);

  if (!weatherData) return null;

  const { location, current, forecast } = weatherData;
  const temp = unit === 'C' ? current.temp_c : current.temp_f;

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting;
    if (hour >= 5 && hour < 12) timeGreeting = 'Good Morning';
    else if (hour >= 12 && hour < 18) timeGreeting = 'Good Afternoon';
    else if (hour >= 18 && hour < 22) timeGreeting = 'Good Evening';
    else timeGreeting = 'Good Night';

    return `${timeGreeting} from ${location.name}!`;
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth === scrollWidth) {
        scrollRef.current.scrollLeft = 0;
      }
    }
  };

  return (
    <div className="rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 animate-fadeIn" style={{ backgroundColor: '#04030b' }}>
      <h2 className="text-lg sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-gray-400">{getGreeting()}</h2>
      <h3 className="text-2xl sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-gray-300">{location.name}, {location.country}</h3>
      
      {/* Current Weather */}
      <div className="bg-gray-900 text-white p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
        <div className="flex items-center mb-4 sm:mb-0">
          <img src={current.condition.icon} alt={current.condition.text} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mr-4 sm:mr-6" />
          <div>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold mb-1 sm:mb-2 text-gray-200 ">{temp}°{unit}</p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">{current.condition.text}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 ">
        <WeatherDetailSmall icon={<WiRaindrop className="text-blue-500 text-3xl sm:text-4xl" />} value={`${current.humidity}%`} />
        <WeatherDetailSmall icon={<WiWindDeg className="text-green-500 text-3xl sm:text-4xl" />} value={`${current.wind_kph} km/h`} />
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="mb-8 sm:mb-12 ">
        <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-200">5-Day Forecast</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {forecast.forecastday.map((day, index) => (
            <DayForecast key={index} day={day} unit={unit} />
          ))}
        </div>
      </div>

      {/* 24-Hour Forecast */}
      <div className="mb-8 sm:mb-12">
        <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-200">24-Hour Forecast</h4>
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 sm:pb-6 hide-scrollbar" 
          onScroll={handleScroll}
          style={{ scrollBehavior: 'smooth' }}
        >
          {hourlyData.map((hour, index) => (
            <HourForecast key={index} hour={hour} unit={unit} />
          ))}
        </div>
      </div>

      {/* Weather Details */}
      <div className="mb-8 sm:mb-12">
        <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-200">Weather Details</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        <WeatherDetailCard title="Feels Like" value={`${unit === 'C' ? current.feelslike_c : current.feelslike_f}°${unit}`} icon={<WiThermometer className="text-red-500 text-3xl sm:text-4xl" />} />
          <WeatherDetailCard title="Humidity" value={`${current.humidity}%`} icon={<WiHumidity className="text-blue-500 text-3xl sm:text-4xl"  />} />
          <WeatherDetailCard title="Wind Speed" value={`${current.wind_kph} km/h`} icon={<WiStrongWind className="text-green-500 text-3xl sm:text-4xl" />} />
          <WeatherDetailCard title="UV Index" value={current.uv} icon={<WiDaySunny className="text-yellow-500 text-3xl sm:text-4xl" />} />
          <WeatherDetailCard title="Pressure" value={`${current.pressure_mb} mb`} icon={<WiBarometer className="text-purple-500 text-3xl sm:text-4xl" />} />
          <WeatherDetailCard title="Visibility" value={`${current.vis_km} km`} icon={<FaEye className="text-indigo-500 text-3xl sm:text-4xl" />} />
          <WeatherDetailCard title="Precipitation" value={`${current.precip_mm} mm`} icon={<WiRaindrops className="text-blue-400 text-3xl sm:text-4xl" />} />
          <WeatherDetailCard title="Wind Direction" value={current.wind_dir} icon={<WiWindDeg className="text-teal-500 text-3xl sm:text-4xl" style={{ transform: `rotate(${current.wind_degree}deg)` }} />} />
        </div>
      </div>

      {/* Sunrise & Sunset */}
      <div>
        <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-200">Sunrise & Sunset</h4>
        <div className="flex justify-around items-center bg-gray-900 rounded-lg p-4 sm:p-6">
          <SunriseSunset type="sunrise" time={forecast.forecastday[0].astro.sunrise} />
          <SunriseSunset type="sunset" time={forecast.forecastday[0].astro.sunset} />
        </div>
      </div>
    </div>
  );
}

function WeatherDetailSmall({ icon, value }) {
  return (
    <div className="flex items-center">
      {icon}
      <span className="text-base sm:text-lg md:text-xl text-gray-300 ml-2">{value}</span>
    </div>
  );
}

function DayForecast({ day, unit }) {
  return (
    <div className=" bg-gray-900 text-white p-4 rounded-xl text-center sm:p-4">
      <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
      <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto my-2 sm:my-3" />
      <p className="font-bold text-base sm:text-lg">{Math.round(unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f)}°{unit}</p>
      <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">{day.day.condition.text}</p>
    </div>
  );
}

function HourForecast({ hour, unit }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl flex-shrink-0 w-20 sm:w-24 text-center mr-4 sm:mr-6">
      <p className="text-xs sm:text-sm mb-1 sm:mb-2">{hour.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}</p>
      <img src={hour.icon} alt={hour.condition} className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2" />
      <p className="font-semibold text-base sm:text-lg mb-1">{Math.round(hour.temp)}°{unit}</p>
      <p className="text-xs text-gray-400">{hour.chanceOfRain}%</p>
    </div>
  );
}

function WeatherDetailCard({ title, value, icon }) {
  return (
    <div className="bg-gray-900 text-white rounded-lg p-3 sm:p-4 flex items-center">
      {icon}
      <div className="ml-3 sm:ml-4">
        <p className="text-xs sm:text-sm text-gray-400">{title}</p>
        <p className="text-base sm:text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function SunriseSunset({ type, time }) {
  const Icon = type === 'sunrise' ? WiSunrise : WiSunset;
  const colorClass = type === 'sunrise' ? 'text-yellow-500' : 'text-orange-500';
  return (
    <div className="text-center bg-gray-900 text-white p-4 rounded-xl ">
       <Icon className={`bg-text-3xl sm:text-4xl md:text-5xl ${colorClass} mx-auto mb-1 sm:mb-2`} />
      <p className="text-gray-400 mb-1 text-xs sm:text-sm">{type === 'sunrise' ? 'Sunrise' : 'Sunset'}</p>
      <p className="font-semibold text-base sm:text-lg">{time}</p>
    </div>
  );
}

WeatherDetailSmall.propTypes = {
  icon: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
};

DayForecast.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    day: PropTypes.shape({
      avgtemp_c: PropTypes.number.isRequired,
      avgtemp_f: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(['C', 'F']).isRequired,
};

HourForecast.propTypes = {
  hour: PropTypes.shape({
    time: PropTypes.instanceOf(Date).isRequired,
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    chanceOfRain: PropTypes.number.isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(['C', 'F']).isRequired,
};

WeatherDetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
};

SunriseSunset.propTypes = {
  type: PropTypes.oneOf(['sunrise', 'sunset']).isRequired,
  time: PropTypes.string.isRequired,
};

WeatherDisplay.propTypes = {
  weatherData: PropTypes.shape({
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    current: PropTypes.shape({
      temp_c: PropTypes.number.isRequired,
      temp_f: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
      humidity: PropTypes.number.isRequired,
      wind_kph: PropTypes.number.isRequired,
      pressure_mb: PropTypes.number.isRequired,
      precip_mm: PropTypes.number.isRequired,
      uv: PropTypes.number.isRequired,
      feelslike_c: PropTypes.number.isRequired,
      feelslike_f: PropTypes.number.isRequired,
      vis_km: PropTypes.number.isRequired,
      wind_degree: PropTypes.number.isRequired,
      wind_dir: PropTypes.string.isRequired,
    }).isRequired,
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        day: PropTypes.shape({
          avgtemp_c: PropTypes.number.isRequired,
          avgtemp_f: PropTypes.number.isRequired,
          condition: PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        astro: PropTypes.shape({
          sunrise: PropTypes.string.isRequired,
          sunset: PropTypes.string.isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(['C', 'F']).isRequired,
};

export default WeatherDisplay;
