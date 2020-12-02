import Vuex from 'vuex';
import Vue from 'vue';
import weather from './modules/weather';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { weather },
});
