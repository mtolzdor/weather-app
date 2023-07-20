export interface coord {
  x: number;
  y: number;
}

export interface weatherData {
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

export interface weather {
  weather: string;
  icon: string;
  temp: number;
  country: string;
  area: string;
}
