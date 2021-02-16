import axios from "axios";

export default {
  state: {
    blogs: [],
    metaBlogs: {},
    blog: null,
  },
  getters: {
    blogs(state) {
      return state.blogs;
    },
    metaBlogs(state) {
      return state.metaBlogs;
    },
    blog(state) {
      return state.blog;
    },
  },
  mutations: {
    addBlog(state, data) {
      state.blogs.push(data);
    },
    getBlogs(state, data) {
      state.blogs = data;
    },
    getMetaBlogs(state, data) {
      state.metaBlogs = data;
    },
    getBlog(state, data) {
      state.blog = data;
    },
    deleteBlog(state, id) {
      const index = state.blogs.data.findIndex((item) => item.id == id);
      state.blogs.data.splice(index, 1);
    },
  },
  actions: {
    async getBlogs(context, route) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;

      await new Promise((resolve, reject) => {
        axios
          .get("/api/v1/blog?page=" + route)
          .then((response) => {
            resolve(response);
            context.commit("getBlogs", response.data.data);
            context.commit("getMetaBlogs", response.data.meta);
          })
          .catch((error) => {
            reject(error);
            context.dispatch("destroyToken", error.response.status);
          });
      });
    },
    async searchBlogs(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;

      await new Promise((resolve, reject) => {
        axios
          .get("/api/v1/blog/s/" + data.search + "?page=" + data.route)
          .then((response) => {
            resolve(response);
            context.commit("getBlogs", response.data.data);
            context.commit("getMetaBlogs", response.data.meta);
          })
          .catch((error) => {
            reject(error);
            context.dispatch("destroyToken", error.response.status);
          });
      });
    },
    async getBlog(context, id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;

      await new Promise((resolve, reject) => {
        axios
          .get("/api/v1/blog/" + id)
          .then((response) => {
            resolve(response);
            context.commit("getBlog", response.data.data);
          })
          .catch((error) => {
            reject(error);
            context.dispatch("destroyToken", error.response.status);
          });
      });
    },
    async addBlog(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;
      await new Promise((resolve, reject) => {
        axios
          .post("/api/v1/blog", data)
          .then((response) => {
            resolve(response);
            context.commit("addBlog", response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async updateBlog(context, data) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.getters.token;
      await new Promise((resolve, reject) => {
        axios
          .patch("/api/v1/blog/" + data.id, data)
          .then((response) => {
            resolve(response);
            context.commit("getBlog", response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async deleteBlog(context, data) {
      await axios.delete("/api/v1/blog/" + data.id).then(() => {
        context.dispatch("getBlogs", data.route);
      });
    },
  },
};
