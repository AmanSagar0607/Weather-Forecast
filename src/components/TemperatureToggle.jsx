import PropTypes from 'prop-types';

function TemperatureToggle({ unit, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="bg-transparent border-none outline-none focus:outline-none text-white text-lg sm:text-xl sm:p-3 p-2 hover:bg-gray-700 transition-colors duration-200"
    >
      {unit === 'C' ? '°C' : '°F'}
    </button>
  );
}

TemperatureToggle.propTypes = {
  unit: PropTypes.oneOf(['C', 'F']).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TemperatureToggle;