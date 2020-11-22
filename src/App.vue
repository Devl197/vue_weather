<template>
  <div id="app">
    <Header
      v-on:searchCity="handleSearch"
      v-on:selectCity="handleSelectedCity"
      v-bind:weatherResults="weatherResults"
    />
    <Main v-bind:weatherData="weatherData" />
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Main from './components/Main';
  import cities from './assets/cities.json';
  import { API_KEY } from './secret.js';

  export default {
    name: 'App',
    components: {
      Header,
      Main,
    },
    data() {
      return {
        weatherResults: [],
        weatherData: {},
      };
    },
    methods: {
      // Method which handles searching cities
      async handleSearch(city) {
        const idArray = [];
        cities.forEach(val => {
          if (val.name.toLowerCase() == city) idArray.push(val.id);
        });
        if (idArray.length > 0) {
          const res = await this.getCurrentWeatherByIds(idArray);
          this.weatherResults = res;
        } else {
          console.log('Not valid city name');
        }
      },
      // Method which handles searching selected city
      async handleSelectedCity(data) {
        // clear search results
        this.weatherResults = [];
        const res = await this.getFullWeather(data.lat, data.lon);
        res.name = data.name;
        res.country = data.country;
        this.weatherData = res;
      },
      // Method which fetches current weather (it is not structured the same way as in full weather details see 'https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=439d4b804bc8187953eb36d2a8c26a02') details for an array of city IDs  from openweathermap.org
      async getCurrentWeatherByIds(IDs) {
        const responseForCity = await fetch(
          `https://api.openweathermap.org/data/2.5/group?id=${IDs.toString()}&units=metric&appid=${API_KEY}`
        );

        const dataForCites = await responseForCity.json();

        return dataForCites.list;
      },
      // Method which fetches full weather details from openweathermap.org (see 'https://openweathermap.org/api/one-call-api')
      async getFullWeather(lat, lon) {
        const responseForCity = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
        exclude=minutely&units=metric&appid=${API_KEY}`);
        const dataForCity = await responseForCity.json();

        return dataForCity;
      },
    },
  };
</script>

<style></style>
