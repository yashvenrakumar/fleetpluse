import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const DetailScreen = () => {
  const weather = useSelector((state: RootState) => state.weather.weather);

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22 }}>{weather?.city?? "city"}</Text>
        <Text>Temperature: {weather?.temperature??"temperature"}</Text>
        <Text>Humidity: {weather?.humidity??"humidity"}</Text>
        <Text>Wind Speed: {weather?.windSpeed??"windSpeed"}</Text>
        <Text>Condition: {weather?.condition??"condition"}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
