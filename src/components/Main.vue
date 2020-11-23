<template>
  <b-container>
    <b-row>
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
        <h3 class="d-inline-block">
          {{ Math.round(weatherData.current.temp) }}&#176;C
        </h3>
        <p>
          Feels like {{ Math.round(weatherData.hourly[0].feels_like) }}&#176;C
          {{ weatherData.current.weather[0].description }}
        </p>
        <p>
          wind: {{ weatherData.current.wind_speed }} m/s pressure:
          {{ weatherData.current.pressure }} hPa humidity:
          {{ weatherData.current.humidity }}% UV:
          {{ weatherData.current.uvi }} dew point:
          {{ Math.round(weatherData.current.dew_point) }}&#176;C visibility:
          {{ weatherData.current.visibility / 1000 }}km
        </p>
      </b-col>
      <b-col cols="12" lg="6" class="mt-2" id="daily">
        <h4 class="">8-day Forecast</h4>
        <b-row v-for="(daily, index) in weatherData.daily" :key="index">
          <b-col
            cols="4"
            class="d-flex align-items-center justify-content-start"
            ><p class="d-sm-block d-none">
              {{ new Date(daily.dt * 1000).toDateString() }}
            </p>
            <p class="d-block d-sm-none">
              {{ new Date(daily.dt * 1000).toLocaleDateString('en-GB') }}
            </p></b-col
          >
          <b-col cols="8">
            <p>
              <img
                class="text-center d-none d-sm-inline-block"
                :src="
                  `http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`
                "
                alt="weather image"
                width="40"
                height="40"
              />
              {{ Math.round(daily.temp.max) }}/{{
                Math.round(daily.temp.min)
              }}°C
              {{ daily.weather[0].description }}
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6">
        <LineChart
          :chartdata="prepareDataForLineChart()"
          :options="lineChartOptions"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import LineChart from './LineChart.vue';
  export default {
    name: 'Main',
    props: {
      weatherData: {},
    },
    data() {
      return {
        lineChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Hourly forecast',
          },
          legend: {
            display: false,
          },
          tooltips: {
            mode: 'index',
            intersect: true,
          },
          hover: {
            animationDuration: 0,
            mode: 'nearest',
            intersect: true,
          },
          layout: {
            padding: {
              right: 50,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'hour',
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'temp',
                },
                ticks: {
                  stepSize: 2,
                },
              },
            ],
          },
        },
      };
    },
    components: { LineChart },
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
      prepareDataForLineChart() {
        const hours = this.weatherData.hourly.map(x =>
          new Date(x.dt * 1000).getHours()
        );
        console.log(hours);
        hours.splice(8, 48 - 8);
        const temp = this.weatherData.hourly.map(x => Math.round(x.temp));
        temp.splice(8, 48 - 8);

        const data = {
          labels: hours,
          datasets: [
            {
              label: 'temperature',
              backgroundColor: `rgb(255, 204, 153)`,
              borderColor: `rgb(255, 153, 51)`,
              data: temp,
              fill: true,
            },
          ],
        };
        return data;
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
