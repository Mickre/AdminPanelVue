import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import user from "./modules/user";
import blog from "./modules/blog";
import image from "./modules/image";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token") || null,
  },
  getters: {
    token(state) {
      return state.token;
    },
    loggedIn(state) {
      return state.token !== null;
    },
  },
  mutations: {
    retrieveToken(state, data) {
      state.token = data;
    },
    destroyToken(state) {
      state.token = null;
    },
  },
  actions: {
    destroyToken(context, status) {
      if (status === 401 || status === 500) {
        localStorage.clear();
        context.commit("destroyToken");
      }
    },
    async logout(context) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + context.getters.token;
      await axios.post("/api/v1/logout")
      .then(() => {
        localStorage.clear();
        context.commit("destroyToken");
      })
      .catch(() => {
        localStorage.clear();
        context.commit("destroyToken");
      });
    },
    retrieveToken(context, token) { 
      localStorage.setItem("access_token", token);
      context.commit("retrieveToken", token);
    },
    async login(context, data) {
      await new Promise((resolve, reject) => {
        axios.post("/api/v1/login", data)
        .then((response) => {
          const token = response.data.access_token;
          context.dispatch("retrieveToken", token);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
  },
  modules: {
    user,
    blog,
    image,
  },
});
