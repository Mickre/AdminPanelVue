import axios from "axios";

export default {
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    getUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    async getUser(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;

      await axios
          .get("/api/v1/user")
          .then((response) => {
            context.commit("getUser", response.data.data);
          })
          .catch((error) => {
            context.dispatch("destroyToken", error.response.status);
          });
    },
    async updateUser(context, data) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + context.getters.token;
      await new Promise((resolve, reject) => {
        axios
          .patch("/api/v1/user", data)
          .then((response) => {
            resolve(response);
            context.commit("getUser", response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
