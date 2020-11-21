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
            <b-list-group-item v-for="city in weatherResults" :key="city.id">
              <b-row>
                <b-col
                  md="4"
                  class="d-flex justify-content-end align-items-center"
                >
                  <img
                    class="d-none d-sm-none d-md-block"
                    width="60px"
                    height="60px"
                    :src="
                      `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
                    "
                    alt="weather image"
                  />
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
        const city = this.name.toLowerCase();
        this.$emit('searchCity', city);
        this.name = '';
      }
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
b-col {
  background-color: red;
}
</style>
