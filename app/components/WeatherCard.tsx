import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { updateCurrentWeather } from "../redux/slice/weatherHostory";

const WeatherCard = ({ data }: any) => {
  const router = useRouter();
  const dispatch=useDispatch();
  const { theme } = useTheme();

  const styles = themedStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/screens/DetailScreen");
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{data.city}</Text>
        <Text style={styles.text}>{data.temperature}</Text>
        <Text style={styles.text}>Humidity: {data.humidity}</Text>
        <Text style={styles.text}>Wind: {data.windSpeed}</Text>
        <Text style={styles.text}>{data.condition}</Text>
        <Text style={styles.date}>{data.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const themedStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.cardBackground, // Use theme colors
      padding: 20,
      borderRadius: 15,
      elevation: 4,
      shadowColor: theme.colors.shadow || "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    text: {
      color: theme.colors.text,
      marginTop: 4,
    },
    date: {
      marginTop: 10,
      fontStyle: "italic",
      color: theme.colors.textSecondary || theme.colors.text,
    },
  });

export default WeatherCard;
