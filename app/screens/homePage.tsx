import React, { useEffect } from "react";
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/weatherStore";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { updateCurrentWeather } from "../redux/slice/weatherHostory";

const HomeScreen = observer(() => {
  const { fetchWeather, weatherData, loading, error, refresh } = weatherStore;
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const weatherHistory = useSelector(
    (state: RootState) => state.weather.weatherHistory
  );

  const dispatch= useDispatch();
  useEffect(() => {
    fetchWeather("San Francisco");
    console.log("weatherDetails", weatherHistory);
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refresh}
          colors={[theme.colors.primary]}
        />
      }
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Weather App
        </Text>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.toggleButton, { borderColor: theme.colors.border }]}
        >
          <Text style={{ color: theme.colors.text }}>
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      <SearchBar />

      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      {error ? (
        <Text style={{ color: theme.colors.error, marginVertical: 10 }}>
          {error}
        </Text>
      ) : null}

      {weatherData && <WeatherCard data={weatherData} />}

      {weatherHistory.length > 0 && (
        < >
          <Text style={[styles.historyTitle, { color: theme.colors.text }]}>
            Weather History
          </Text>
          <FlatList
            data={weatherHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TouchableOpacity onPress={()=>{
                dispatch(updateCurrentWeather(item));
            }}>
               <WeatherCard data={item} />
            </TouchableOpacity>}
            scrollEnabled={false} // to allow parent ScrollView to scroll
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
          />
        </>
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  toggleButton: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;


// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   RefreshControl,
//   ScrollView,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { observer } from "mobx-react-lite";
// import weatherStore from "../store/weatherStore";
// import SearchBar from "../components/SearchBar";
// import WeatherCard from "../components/WeatherCard";
// import { useTheme } from "../context/ThemeContext";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/rootReducer";
 
// const HomeScreen = observer(() => {
//   const { fetchWeather, weatherData, loading, error, refresh } = weatherStore;
//   const { theme, toggleTheme, isDarkMode } = useTheme();
//   const weatherDetails = useSelector((state: RootState) => state.weather);

//    useEffect(() => {
//     fetchWeather("San Francisco");
//     console.log('weatherDetails', weatherDetails)
//    }, []);

 
//   return (
//     <ScrollView
//       style={{ backgroundColor: theme.colors.background }}
//       contentContainerStyle={[styles.container]}
//       refreshControl={
//         <RefreshControl
//           refreshing={loading}
//           onRefresh={refresh}
//           colors={[theme.colors.primary]}
//         />
//       }
//     >
//       <View style={styles.header}>
//         <Text style={[styles.title, { color: theme.colors.text }]}>
//           Weather App
//         </Text>
//         <TouchableOpacity
//           onPress={toggleTheme}
//           style={[styles.toggleButton, { borderColor: theme.colors.border }]}
//         >
//           <Text style={{ color: theme.colors.text }}>
//             {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <SearchBar />
//       {loading && (
//         <ActivityIndicator size="large" color={theme.colors.primary} />
//       )}
//       {error ? (
//         <Text style={{ color: theme.colors.error, marginVertical: 10 }}>
//           {error}
//         </Text>
//       ) : null}
//       {weatherData && <WeatherCard data={weatherData} />}
//     </ScrollView>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   header: {
//     marginBottom: 20,
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   toggleButton: {
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//   },
// });

// export default HomeScreen;
