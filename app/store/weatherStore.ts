
import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWeatherFromAPI } from "../services/weatherService";
import { dummyWeather } from "../utils/dummyWeather";
 
interface WeatherData {
  city: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  condition: string;
  date: string;
}

class WeatherStore {
  weatherData: WeatherData | null = null;
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  fetchWeather = async (city: string) => {
     this.loading = true;
    this.error = "";

    try {
      const data = await fetchWeatherFromAPI(city);
      
      runInAction(() => {
        this.weatherData = data;
        AsyncStorage.setItem("lastWeather", JSON.stringify(data));
        this.loading = false;
      });
    } catch (err) {
      runInAction(async () => {
        this.error = "Unable to fetch weather. Showing cached or dummy data.";

        const cached = await AsyncStorage.getItem("lastWeather");

        if (cached) {
          this.weatherData = JSON.parse(cached);
        } else {
          this.weatherData = dummyWeather; // ✅ fallback dummy
        }

        this.loading = false;
      });
    }
  };

  refresh = async () => {
    if (this.weatherData?.city) {
      await this.fetchWeather(this.weatherData.city);
    }
  };
}

const weatherStore = new WeatherStore();
export default weatherStore;
