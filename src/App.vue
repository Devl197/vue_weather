<template>
  <div id="app">
    <Header
      v-on:searchCity="handleSearch"
      v-on:selectCity="handleSelectedCity"
      v-bind:weatherResults="weatherResults"
    />
    <div v-if="is_data_fetched">
      <Main v-bind:weatherData="weatherData" />
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Main from './components/Main';
  import cities from './assets/cities.json';

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
        is_data_fetched: false,
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
        this.is_data_fetched = true;
      },
      // Method which fetches current weather (it is not structured the same way as in full weather details see 'https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=439d4b804bc8187953eb36d2a8c26a02') details for an array of city IDs  from openweathermap.org
      async getCurrentWeatherByIds(IDs) {
        try {
          const responseForCity = await fetch(
            `/api/weather/city/id=${IDs.toString()}`
          );
          const dataForCites = await responseForCity.json();
          return dataForCites;
        } catch (error) {
          console.log(error);
        }
      },
      // Method which fetches full weather details from openweathermap.org (see 'https://openweathermap.org/api/one-call-api')
      async getFullWeather(lat, lon) {
        try {
          const responseForCity = await fetch(
            `/api/weather/city/lat=${lat}&lon=${lon}`
          );
          const dataForCity = await responseForCity.json();
          return dataForCity;
        } catch (error) {
          console.log(error);
        }
      },
    },
    async mounted() {
      const data = {
        lat: 44.804008,
        lon: 20.46513,
        name: 'Belgrade',
        country: 'RS',
      };
      await this.handleSelectedCity(data);
    },
  };
</script>

<style></style>
