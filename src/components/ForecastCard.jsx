import PropTypes from 'prop-types';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiDayCloudy } from 'react-icons/wi';

function ForecastCard({ day, unit }) {
  const date = new Date(day.date);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const temp = unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f;

  const getWeatherIcon = (condition) => {
    const lowercaseCondition = condition.toLowerCase();
    if (lowercaseCondition.includes('sun') || lowercaseCondition.includes('clear')) return <WiDaySunny />;
    if (lowercaseCondition.includes('rain')) return <WiRain />;
    if (lowercaseCondition.includes('cloud')) return <WiCloudy />;
    if (lowercaseCondition.includes('snow')) return <WiSnow />;
    return <WiDayCloudy />;
  };

  return (
    <div className="weather-card text-center animate-fadeIn hover:scale-105 transition-transform duration-300">
      <p className="font-bold text-primary">{dayOfWeek}</p>
      <div className="text-5xl my-2 text-gray-600">
        {getWeatherIcon(day.day.condition.text)}
      </div>
      <p className="text-2xl font-semibold text-secondary">{Math.round(temp)}°{unit}</p>
      <p className="text-sm text-gray-600">{day.day.condition.text}</p>
    </div>
  );
}

// Prop validation
ForecastCard.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    day: PropTypes.shape({
      avgtemp_c: PropTypes.number.isRequired,
      avgtemp_f: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        text: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(['C', 'F']).isRequired,
};

export default ForecastCard;