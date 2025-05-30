//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hyderabad?unitGroup=us&key=Q3DDVQZ3PPCPKKURNSX48P9WE&contentType=json


export const fetchWeatherFromAPI = async (city: string) => {
  const key = "Q3DDVQZ3PPCPKKURNSX48P9WE";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    city
  )}?unitGroup=metric&key=${key}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Network response failed");

  const data = await response.json();

  // Extract key values from API response
  const today = data.days[0];

  return {
    city: data.resolvedAddress || city,
    temperature: `${today.temp.toFixed(1)}°C`,
    humidity: `${today.humidity.toFixed(0)}%`,
    windSpeed: `${today.windspeed.toFixed(1)} km/h`,
    condition: today.conditions,
    date: today.datetime,
    icon: today.icon, // Optional: use this for rendering weather icons
    description: today.description, // Optional: more details
  };
};
