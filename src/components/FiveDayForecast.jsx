import React from 'react';

function FiveDayForecast({ forecast }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {forecast.map((day, index) => (
            <div key={index} className="flex-shrink-0 w-32 bg-white rounded-lg shadow-md p-4">
              <p className="font-semibold">{day.date}</p>
              <img src={day.icon} alt={day.description} className="w-16 h-16 mx-auto my-2" />
              <p className="text-sm">{day.description}</p>
              <p className="text-sm">High: {day.highTemp}°C</p>
              <p className="text-sm">Low: {day.lowTemp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FiveDayForecast;