import React, { useEffect, useState } from "react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { coord, weather, weatherData } from "../model";
import axios, { AxiosResponse } from "axios";

interface Props {
  position: coord;
  weather: weather;
  setWeather: React.Dispatch<React.SetStateAction<weather>>;
}

const Weather: React.FC<Props> = ({ position, weather, setWeather }) => {
  const [isFahrenheit, setFahrenheit] = useState<boolean>(false);

  useEffect(() => {
    const getWeather = async () => {
      const response: AxiosResponse<weatherData> = await axios(
        `https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.y}&lon=${position.x}`
      );
      setWeather({
        weather: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        temp: response.data.main.temp,
        country: response.data.sys.country,
        area: response.data.name,
      });
    };
    getWeather();
  }, [position]);

  const handleConvert = (): number => {
    if (isFahrenheit === false) {
      return (weather.temp * 9) / 5 + 32;
    } else {
      return weather.temp;
    }
  };

  const newTemp: number = Math.round(handleConvert() * 10) / 10;

  return (
    <div className="weather_display" id="display">
      <span className="weather_item" id="location">
        {weather.area}, {weather.country}
      </span>
      {isFahrenheit ? (
        <div className="weather_item" id="temp">
          {newTemp}
          <button
            className="weather_button"
            onClick={() => setFahrenheit(!isFahrenheit)}
          >
            <TbTemperatureCelsius />
          </button>
        </div>
      ) : (
        <div className="weather_item" id="temp">
          {newTemp}
          <button
            className="weather_button"
            onClick={() => setFahrenheit(!isFahrenheit)}
          >
            <TbTemperatureFahrenheit />
          </button>
        </div>
      )}
      <img
        src={weather.icon}
        alt="Weather_Icon"
        className="weather_item"
        id="icon"
      ></img>
      <div className="weather_item" id="weather">
        {weather.weather}
      </div>
    </div>
  );
};

export default Weather;
