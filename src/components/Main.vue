<template>
  <b-container>
    <b-row class="rounded-lg shadow border">
      <b-col cols="12" md="6" class="mt-2" id="weatherData">
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

<style lang="scss" scoped></style>
