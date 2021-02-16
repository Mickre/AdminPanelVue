<template>
  <Theme>
    <div class="w-full">
      <div class="bg-pink-200">
        <div
          class="container flex items-center justify-between h-20 px-5 mx-auto"
        >
          <h2 class="text-xl font-semibold">Edytuj wpis</h2>
        </div>
      </div>
      <div class="container px-4 py-10 mx-auto" v-if="!loading">
        Pobieranie danych...
      </div>
      <form @submit.prevent="edit" v-if="loading">
        <div class="lg:flex">
          <div class="w-full p-5 lg:w-2/3">
            <Editor v-model="blog.text" :name="'blog'" />
          </div>
          <div class="w-full p-5 lg:w-1/3">
            <label for="name" class="text-lg">Nazwa*</label>
            <input
              id="name"
              type="text"
              placeholder="Nazwa"
              v-model="blog.name"
              class="inline-block w-full px-4 py-3 mt-2 mb-5 text-gray-900 placeholder-gray-800 shadow-lg appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-600"
              required
            />
            <div
              v-if="error.title"
              class="px-3 py-2 mb-5 text-white bg-red-600"
            >
              {{ error.title[0] }}
            </div>
            <label for="email" class="text-lg">Tytuł*</label>
            <input
              id="email"
              type="text"
              placeholder="Tytuł"
              v-model="blog.title"
              class="inline-block w-full px-4 py-3 mt-2 mb-5 text-gray-900 placeholder-gray-800 shadow-lg appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-600"
              required
            />
            <div
              v-if="error.title"
              class="px-3 py-2 mb-5 text-white bg-red-600"
            >
              {{ error.title[0] }}
            </div>
            <label for="description" class="text-lg">Opis</label>
            <input
              id="description"
              type="text"
              placeholder="Opis"
              v-model="blog.description"
              class="inline-block w-full px-4 py-3 mt-2 mb-5 text-gray-900 placeholder-gray-800 shadow-lg appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-600"
            />
            <label for="tags" class="text-lg">Tagi</label>
            <input
              id="tags"
              type="text"
              placeholder="Tagi"
              v-model="blog.tags"
              class="inline-block w-full px-4 py-3 mt-2 mb-5 text-gray-900 placeholder-gray-800 shadow-lg appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-600"
            />
            <label for="category" class="text-lg">Kategoria</label>
            <input
              id="category"
              type="text"
              placeholder="Kategoria"
              v-model="blog.category"
              class="inline-block w-full px-4 py-3 mt-2 mb-5 text-gray-900 placeholder-gray-800 shadow-lg appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-600"
            />
            <label for="thumbnail" class="text-lg">Miniaturka</label>
            <template v-if="blog.thumbnail">
              <div class="text-red-400" v-if="file">
                Obraz zostanie usunięty po zapisaniu dokumentu.
              </div>
              <div class="pb-4" v-else>
                <img
                  :src="`${url}/storage/blog/${blog.thumbnail}`"
                  class="object-contain my-2"
                />
                <button
                  class="block px-4 py-1 text-xs font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple"
                  type="button"
                  @click="thumbDelete"
                >
                  Usuń
                </button>
              </div>
            </template>
            <input
              v-else
              id="thumbnail"
              type="file"
              placeholder="Plik"
              v-on:change="thumbUpload"
              class="inline-block w-full px-4 py-3 mt-2 mb-5 text-gray-900 placeholder-gray-800 shadow-lg appearance-none bg-gray-50 focus:outline-none focus:ring-1 focus:ring-pink-600"
            />
            <div
              v-if="error.thumbnail"
              class="px-3 py-2 mb-5 text-white bg-red-600"
            >
              {{ error.thumbnail }}
            </div>
            <label class="flex items-center space-x-3">
              <input
                v-model="blog.public"
                name="public"
                type="checkbox"
                true-value="1"
                false-value="0"
                class="w-6 h-6 border border-gray-300 rounded-md appearance-none checked:bg-blue-600 checked:border-transparent focus:outline-none"
              />
              <span class="font-medium text-gray-900">Publikuj</span>
            </label>
            <hr class="my-5 border border-gray-100 border-solid" />
            <button
              type="submit"
              class="inline-block w-32 px-4 py-3 text-lg font-medium text-white bg-pink-600 shadow-lg appearance-none hover:bg-pink-100 hover:text-black focus:outline-none"
            >
              Zapisz
            </button>
          </div>
        </div>
      </form>
    </div>
  </Theme>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BlogEdit",
  components: {
    Theme: () => import("@/components/Layouts/Theme.vue"),
    Editor: () => import("@/components/Editor.vue"),
  },
  data() {
    return {
      loading: false,
      url: "https://miauketing.pl",
      file: null,
      error: {
        name: null,
        title: null,
        thumbnail: null,
      },
    };
  },
  watch: {
    "$route.params.id": "$fetch",
  },
  created() {
    this.$store.dispatch("getBlog", this.$route.params.id).then(() => {
      this.loading = true;
    });
  },
  computed: {
    ...mapState(["blog"]),
    ...mapGetters(["blog"]),
  },
  methods: {
    edit() {
      this.error = {
        name: null,
        title: null,
        thumbnail: null,
      };
      this.$store
        .dispatch("updateBlog", {
          id: this.blog.id,
          name: this.blog.name,
          title: this.blog.title,
          description: this.blog.description,
          tags: this.blog.tags,
          text: this.blog.text || "",
          category: this.blog.category,
          thumbnail: this.file,
          public: this.blog.public || 0,
        })
        .then(() => {
          this.file = false;
          this.$toasted.success("Zapisane!");
        })
        .catch((e) => {
          this.error = e.response.data.errors ?? e.response.data;
          this.$toasted.error("Error!");
        });
    },
    thumbDelete() {
      this.file = [this.blog.thumbnail];
    },
    thumbUpload(e) {
      this.error.thumbnail = null;
      let files = e.target.files || e.dataTransfer.files;
      var exs = ["image/jpeg", "image/png"];

      var found = exs.find(function(e) {
        return e === files[0].type;
      });

      if (found) {
        this.error.thumbnail = null;
        this.createImage(files[0]);
      } else {
        this.file = null;
        this.error.thumbnail = "Nie akceptowane pliki!";
        this.$toast.error("Error!");
      }
    },
    createImage(file) {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.file = e.target.result;
      };
    },
  },
};
</script>
