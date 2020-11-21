<template>
  <div id="app">
    <Header
      v-on:searchCity="handleSearch"
      v-bind:weatherResults="weatherResults"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import cities from './assets/cities.json';
import { API_KEY } from './secret.js';

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      weatherResults: [],
    };
  },
  methods: {
    async handleSearch(city) {
      const idArray = [];
      cities.forEach(val => {
        if (val.name.toLowerCase() == city) idArray.push(val.id);
      });

      const res = await this.getCurrentWeatherByIds(idArray);
      this.weatherResults = res;
    },
    async getCurrentWeatherByIds(IDs) {
      const responseForCity = await fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${IDs.toString()}&units=metric&appid=${API_KEY}`
      );

      const dataForCites = await responseForCity.json();

      return dataForCites.list;
    },
  },
};
</script>

<style></style>
