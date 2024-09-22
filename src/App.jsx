import { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
// import ForecastCard from './components/ForecastCard';
import TemperatureToggle from './components/TemperatureToggle';

// const env.VITE_WEATHER_API_KEY = 'bf9020768ff7487a83c191345242009';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (city = 'Bhopal') => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=5`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (query) => {
    fetchWeather(query);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-4 sm:mb-0">Weather Forecast</h1>
          <div className="flex items-center">
            <SearchBar  onSearch={handleSearch} />
            <div className="mb-4 ml-4 sm:mb-0 rounded-lg  bg-gray-800 text-gray-300">
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : weatherData && (
          <>
            <WeatherDisplay weatherData={weatherData} unit={unit} />
            {/* <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800">5-Day Forecast</h2> */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
              {weatherData.forecast.forecastday.map((day) => (
                <ForecastCard key={day.date} day={day} unit={unit} />
              ))}
            </div> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeatherDetails weatherData={weatherData} unit={unit} />
              <SunriseSunset weatherData={weatherData} />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
