<template>
  <b-container>
    <b-row class="rounded-lg shadow border">
      <b-col cols="12" lg="6" class="mt-2" id="weatherData">
        <h4>
          <b-icon-geo-alt-fill></b-icon-geo-alt-fill>{{ weatherData.name }},
          {{ weatherData.country }}
          <img
            :src="
              require(`../assets/images/flags/24x24/${weatherData.country.toLowerCase()}.png`)
            "
            class="align-bottom"
            alt="country flag"
          />
        </h4>
        <p>{{ returnTimeString() }}</p>
        <img
          :src="
            `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
          "
          alt="weather image"
        />
        <h3 class="d-inline-block">{{ weatherData.current.temp }}&#176;C</h3>
        <p>
          Feels like {{ weatherData.hourly[0].feels_like }}&#176;C
          {{ weatherData.current.weather[0].description }}
        </p>
        <p>
          wind: {{ weatherData.current.wind_speed }} m/s pressure:
          {{ weatherData.current.pressure }} hPa humidity:
          {{ weatherData.current.humidity }}% UV:
          {{ weatherData.current.uvi }} dew point:
          {{ weatherData.current.dew_point }}&#176;C visibility:
          {{ weatherData.current.visibility / 1000 }}km
        </p>
      </b-col>
      <b-col cols="12" lg="6" class="mt-2" id="daily">
        <p class="font-weight-bold text-center">8-day Forecast</p>
        <b-row v-for="(daily, index) in weatherData.daily" :key="index">
          <b-col
            cols="6"
            class="d-flex align-items-center justify-content-lg-end justify-content-center"
            ><p class="text-right">
              {{ new Date(daily.dt * 1000).toDateString() }}
            </p></b-col
          >
          <b-col cols="6">
            <p>
              <img
                class="text-center d-none d-md-inline-block"
                :src="
                  `http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`
                "
                alt="weather image"
                width="40"
                height="40"
              />
              {{ daily.temp.min }}/{{ daily.temp.max }}°C
              {{ daily.weather[0].description }}
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Main',
  props: {
    weatherData: {},
  },
  methods: {
    returnTimeString() {
      const date = new Date(this.weatherData.current.dt * 1000);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return `${date.toLocaleTimeString('en-GB')} ${date.toLocaleDateString(
        'en-GB',
        options
      )}`;
    },
  },
};
</script>

<style lang="scss" scoped>
#daily {
  p {
    margin-bottom: 5px;
  }
}
</style>
