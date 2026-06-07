import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  SunSnow,
} from '@boxicons/react';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = 'Tehran';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=471df3aa830988cf898add7daec9b57e`;
      const res = await axios.get(url);
      setData(res.data);
    };

    fetchDefaultLocation();
  }, []);

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=471df3aa830988cf898add7daec9b57e`;

    try {
      const res = await axios.get(url);
      if (res.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(res.data);
        setLocation('');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setData({ notFound: true });
      }
      console.error('An unexpected error occurred !', err);
    }
  };

  const handleInputChange = e => {
    setLocation(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') search();
  };

  const getWeatherIcon = weatherType => {
    switch (weatherType) {
      case 'Clear':
        return <Sun size='lg' pack='filled' fill='#ffc87c' />;
      case 'Clouds':
        return <Cloud size='lg' pack='filled' fill='#fff' />;
      case 'Rain':
        return <CloudRain size='lg' pack='filled' fill='#5fd1f9' />;
      case 'Thunderstorm':
        return <CloudLightning size='lg' pack='filled' fill='#154abd' />;
      case 'Snow':
        return <CloudSnow size='lg' pack='filled' fill='#52e5e7' />;
      case 'haze':
      case 'Mist':
        return <Cloud size='lg' pack='filled' fill='#ffc87c' />;
      default:
        return <Cloud size='lg' pack='filled' fill='#ffc87c' />;
    }
  };

  return (
    <div className='weather'>
      <div className='search'>
        <div className='search-top'>
          <i className='fa-solid fa-location-dot'></i>
          <div className='location'>{data.name}</div>
        </div>
        <div className='search-location'>
          <input
            type='text'
            placeholder='Enter Location'
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className='fa-solid fa-magnifying-glass' onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (
        <div className='not-found'>Not Found 💥</div>
      ) : (
        <div className='weather-data'>
          {data.weather &&
            data.weather[0] &&
            getWeatherIcon(data.weather[0].main)}
          {/* <Sun size='lg' fill='#ffc87c' pack='filled' /> */}
          <div className='weather-type'>
            {data.weather ? data.weather[0].main : 'null'}
          </div>
          <div className='temp'>
            {data.main ? Math.floor(data.main.temp) : '-   '}° C
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
