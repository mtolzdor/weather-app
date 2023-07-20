import React, { useState, useEffect } from "react";
import "./App.css";
import Weather from "./components/Weather";
import { coord, weather } from "./model";

const App: React.FC = () => {
  const [position, setPosition] = useState<coord>({} as coord);
  const [weather, setWeather] = useState<weather>({} as weather);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        x: pos.coords.longitude,
        y: pos.coords.latitude,
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Local Weather</h1>
        <Weather
          position={position}
          weather={weather}
          setWeather={setWeather}
        />
      </div>
    </div>
  );
};

export default App;
