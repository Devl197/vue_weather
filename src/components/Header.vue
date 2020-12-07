<template>
  <b-container fluid class="bg-dark py-5 mb-3">
    <b-row>
      <b-col class="d-flex justify-content-center">
        <h2 class="text-light">Weather in your city</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="py-4 d-flex justify-content-center">
        <div class="search-container">
          <b-input-group class="py-4">
            <b-form-input
              id="name"
              @keyup="handleKeyUp"
              v-model="name"
              autocomplete="off"
              type="text"
              class="form-control"
              placeholder="Search city"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="secondary" @click="searchCity">
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-list-group
            v-show="getWeatherResults.length > 0"
            id="searchResults"
          >
            <b-list-group-item
              v-for="city in getWeatherResults"
              :key="city.id"
              @click="handleSearchClick"
              :data-lat="city.coord.lat"
              :data-lon="city.coord.lon"
              :data-name="city.name"
              :data-country="city.sys.country"
            >
              <b-row>
                <b-col
                  md="2"
                  class="d-flex justify-content-end align-items-center"
                >
                  <img
                    class="d-none d-md-block"
                    width="60px"
                    height="60px"
                    :src="
                      `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
                    "
                    alt="weather image"
                  />
                </b-col>
                <b-col cols="12" md="10">
                  <p class="mb-0">
                    {{ city.name }}, {{ city.sys.country }}
                    <img
                      :src="
                        require(`../assets/images/flags/16x16/${city.sys.country.toLowerCase()}.png`)
                      "
                      alt="country flag"
                    />
                  </p>
                  <p class="mb-1">
                    <span class="badge badge-pill badge-dark"
                      >{{ Math.round(city.main.temp) }}&#176;C</span
                    >
                    temperature from {{ Math.round(city.main.temp_min) }}&#176;C
                    to {{ Math.round(city.main.temp_max) }}&#176;C, wind
                    {{ city.wind.speed }} m/s, presure
                    {{ city.main.pressure }} hPa
                  </p>
                  <p>Geo coords [{{ city.coord.lat }},{{ city.coord.lon }}]</p>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import cities from '../assets/cities.json';
  export default {
    name: 'Header',
    methods: {
      ...mapActions([
        'getCurrentWeatherByIds',
        'getFullWeather',
        'clearWeatherResults',
      ]),
      // Method which handles keyup event
      async handleKeyUp(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
          await this.searchCity();
        }
      },
      // Method which handles searching cities
      async searchCity() {
        if (this.name !== '') {
          const city = this.name.toLowerCase().trim();

          const idArray = [];

          cities.forEach(val => {
            if (val.name.toLowerCase() == city) idArray.push(val.id);
          });

          if (idArray.length > 0) {
            await this.getCurrentWeatherByIds(idArray);
          } else {
            console.log('Not valid city name');
          }
        }
      },
      // Method which handles searching selected city
      async handleSearchClick(e) {
        let target = e.target;

        // Setting target to li element
        if (target.tagName === 'DIV') {
          target = target.parentNode.parentNode;
        } else if (target.tagName === 'IMG' || target.tagName === 'P') {
          target = target.parentNode.parentNode.parentNode;
        } else if (target.tagName === 'SPAN') {
          target = target.parentNode.parentNode.parentNode.parentNode;
        }

        const data = {
          lat: target.getAttribute('data-lat'),
          lon: target.getAttribute('data-lon'),
          name: target.getAttribute('data-name'),
          country: target.getAttribute('data-country'),
        };

        if (data.lat && data.lon) await this.getFullWeather(data);
        this.clearWeatherResults();
        this.name = '';
      },
    },
    computed: mapGetters(['getWeatherResults']),
    data() {
      return {
        name: '',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list-group {
    .list-group-item p:first-child {
      font-weight: bold;
      color: goldenrod;
    }
  }

  .input-group {
    width: 100% !important;
  }

  #searchResults {
    cursor: pointer;
  }

  .search-container {
    position: relative;
    display: flex;
    width: 100%;
  }

  .search-container p {
    margin-bottom: 0;
  }
  .list-group {
    position: absolute;
    top: 62px;
    width: 100%;
    z-index: 9999;
  }

  @media (min-width: 576px) {
    .search-container {
      width: 75% !important;
    }
  }

  @media (min-width: 992px) {
    .search-container {
      width: 45% !important;
    }
  }

  @media (max-width: 375px) {
    h2 {
      font-size: 1.8em;
    }
  }
</style>
