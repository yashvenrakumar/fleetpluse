import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { debounce } from '../utils/debounce';
import weatherStore from '../store/weatherStore';
import useWeather from '../hooks/useWeather';

const SearchBar = () => {
   const {weather}= useWeather();

  const [query, setQuery] = useState("");
  const handleSearch = debounce((text: string) => {
    if (text.length > 2) {
      weatherStore.fetchWeather(text);

    weather(text)
    }
  }, 1000);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter city"
        style={styles.input}
        value={query}
        onChangeText={(text:string) => {
          setQuery(text);
          handleSearch(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default SearchBar;
