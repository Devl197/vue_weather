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
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Weather in your city"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="secondary" @click="searchCity">
                Search
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <b-list-group v-show="weatherResults.length > 0" id="searchResults">
            <b-list-group-item
              v-for="city in weatherResults"
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
                      >{{ city.main.temp }}&#176;C</span
                    >
                    temperature from {{ city.main.temp_min }}&#176;C to
                    {{ city.main.temp_max }}&#176;C, wind
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
  export default {
    name: 'Header',
    props: {
      weatherResults: Array,
    },
    methods: {
      searchCity() {
        if (this.name !== '') {
          const city = this.name.toLowerCase().trim();
          this.$emit('searchCity', city);
          this.name = '';
        }
      },
      handleSearchClick(e) {
        let target = e.target;

        // Setting target to li element
        if (target.tagName === 'DIV') {
          target = target.parentNode.parentNode;
        } else if (target.tagName === 'IMG' || target.tagName === 'P') {
          target = target.parentNode.parentNode.parentNode;
        } else if (target.tagName === 'SPAN') {
          target = target.parentNode.parentNode.parentNode.parentNode;
        }

        const coord = {
          lat: target.getAttribute('data-lat'),
          lon: target.getAttribute('data-lon'),
          name: target.getAttribute('data-name'),
          country: target.getAttribute('data-country'),
        };

        if (coord.lat && coord.lon) this.$emit('selectCity', coord);
      },
    },
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
</style>
