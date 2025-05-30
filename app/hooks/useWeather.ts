import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../constants/constants";
import { WeatherData } from "../interface/WeatherData";
import {  updateWeather } from "../redux/slice/weatherHostory";


const useWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const weather = async (city: string) => {
    setLoading(true);
    setError(null);



    try {
      const key = "Q3DDVQZ3PPCPKKURNSX48P9WE";
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        city
      )}?unitGroup=metric&key=${key}&contentType=json`;

      const response = await fetch(url);

      const responseData = await response.json();
      const today = responseData.days[0];

      const dataWeather = {
        city: responseData.resolvedAddress || city,
        temperature: `${today.temp.toFixed(1)}°C`,
        humidity: `${today.humidity.toFixed(0)}%`,
        windSpeed: `${today.windspeed.toFixed(1)} km/h`,
        condition: today.conditions,
        date: today.datetime,
        icon: today.icon, // Optional: use this for rendering weather icons
        description: today.description, // Optional: more details
      };

      if (!response.ok) {
        throw new Error(responseData.message || "failed");
      }

      dispatch(updateWeather(dataWeather));
 
      setData(dataWeather);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { weather, data, loading, error };
};

export default useWeather;
