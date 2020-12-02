<template>
  <div id="app">
    <Header />
    <div v-if="!getLoadingState">
      <Main />
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import Main from './components/Main';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'App',
    components: {
      Header,
      Main,
    },
    methods: {
      ...mapActions(['getFullWeather']),
    },
    computed: mapGetters(['getLoadingState']),
    async mounted() {
      const data = {
        lat: 44.804008,
        lon: 20.46513,
        name: 'Belgrade',
        country: 'RS',
      };
      await this.getFullWeather(data);
    },
  };
</script>

<style></style>
