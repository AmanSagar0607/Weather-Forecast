# Weather Forecast

A React-based weather forecast application that provides current weather information and a 5-day forecast for any city.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/AmanSagar0607/Weather-Forecast.git
   cd Weather-Forecast
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your WeatherAPI key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Run the project locally:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Dependencies

- React
- Vite
- Tailwind CSS
- React Icons

## Assumptions

- The application uses the WeatherAPI service for fetching weather data.
- The default city is set to Bhopal, India.
- The temperature unit defaults to Celsius but can be toggled to Fahrenheit.

## How to Use the Application

1. Upon loading, the application displays weather information for the default city (Bhopal).
2. Use the search bar at the top to look up weather information for any city.
3. Click the temperature toggle button (°C/°F) to switch between Celsius and Fahrenheit.
4. The main display shows:
   - Current weather conditions
   - 5-day forecast
   - 24-hour forecast (scrollable)
   - Detailed weather information
   - Sunrise and sunset times

## Development

This project uses Vite as the build tool and Tailwind CSS for styling. To modify the application:

1. Update React components in the `src/components` directory.
2. Modify the main App component in `src/App.jsx`.
3. Adjust styles using Tailwind classes or by editing `tailwind.config.js`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).