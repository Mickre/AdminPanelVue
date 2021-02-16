import axios from "axios";

export default {
  state: {
    images: [],
    metaImages: {},
  },
  getters: {
    images(state) {
      return state.images;
    },
    metaImages(state) {
      return state.metaImages;
    },
  },
  mutations: {
    getImages(state, data) {
      state.images = data;
    },
    getMetaImages(state, data) {
      state.metaImages = data;
    },
    deleteImage(state, id) {
      const index = state.images.data.findIndex((item) => item.id == id);
      state.images.data.splice(index, 1);
    },
  },
  actions: {
    getImages(context, route) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;

      return new Promise((resolve, reject) => {
        axios
          .get("/api/v1/image?page=" + route)
          .then((response) => {
            resolve(response);
            context.commit("getImages", response.data.data);
            context.commit("getMetaImages", response.data.meta);
          })
          .catch((error) => {
            reject(error);
            //context.dispatch("destroyToken", error.response.status);
          });
      });
    },
    deleteImage(context, data) {
      axios.delete("/api/v1/image/" + data.id).then(() => {
        context.dispatch("getImages", data.route);
      });
    },
  },
};
