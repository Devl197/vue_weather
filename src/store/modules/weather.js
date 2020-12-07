const state = {
  weatherResults: [],
  weatherData: {},
  loading: true,
};

const getters = {
  getWeatherResults: state => state.weatherResults,
  getWeatherData: state => state.weatherData,
  getLoadingState: state => state.loading,
};

const actions = {
  // Method which fetches current weather (it is not structured the same way as in full weather details see 'https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=439d4b804bc8187953eb36d2a8c26a02') details for an array of city IDs  from openweathermap.org
  async getCurrentWeatherByIds({ commit }, IDs) {
    try {
      const responseForCity = await fetch(
        `/api/weather/city/id=${IDs.toString()}`
      );
      const dataForCites = await responseForCity.json();
      commit('setWeatherResults', dataForCites);
    } catch (error) {
      console.log(error);
    }
  },
  // Method which fetches full weather details from openweathermap.org (see 'https://openweathermap.org/api/one-call-api')
  async getFullWeather({ commit }, { lat, lon, name, country }) {
    try {
      const responseForCity = await fetch(
        `/api/weather/city/lat=${lat}&lon=${lon}`
      );
      const dataForCity = await responseForCity.json();
      dataForCity.name = name;
      dataForCity.country = country;
      commit('setWeatherData', dataForCity);
      commit('setLoadingState', false);
    } catch (error) {
      console.log(error);
    }
  },
  clearWeatherResults({ commit }) {
    commit('clearWeatherResults', []);
  },
};

const mutations = {
  setWeatherResults: (state, weatherResults) =>
    (state.weatherResults = weatherResults),
  setWeatherData: (state, weatherData) => (state.weatherData = weatherData),
  clearWeatherResults: (state, weatherResults) =>
    (state.weatherResults = weatherResults),
  setLoadingState: (state, nextState) => (state.loading = nextState),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
