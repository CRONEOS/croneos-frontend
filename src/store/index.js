import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import ual from 'components/ual/store';
import app from './app';
import cronjobs from './cronjobs';
import user from './user';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      ual,
      app,
      cronjobs,
      user
    },
    plugins: [
      createPersistedState({
        key: "ual",
        paths: ["ual.SESSION"]
      })
    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false
  })

  return Store
}
