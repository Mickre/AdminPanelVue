<template>
  <Theme>
    <div class="w-full">
      <div class="bg-pink-200">
        <div
          class="container mx-auto flex items-center justify-between px-5 h-20"
        >
          <h2 class="text-xl font-semibold">Dodaj wpis</h2>
        </div>
      </div>
      <form @submit.prevent="add">
        <div class="lg:flex">
          <div class="w-full lg:w-2/3 p-5">
            <Editor v-model="form.text" :name="'blog'" />
          </div>
          <div class="w-full lg:w-1/3 p-5">
            <label for="name" class="text-lg">Nazwa*</label>
            <input
              id="name"
              type="text"
              placeholder="Nazwa"
              v-model="form.name"
              class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
              required
            />
            <div
              v-if="error.title"
              class="py-2 px-3 text-white bg-red-600 mb-5"
            >
              {{ error.title[0] }}
            </div>
            <label for="email" class="text-lg">Tytuł*</label>
            <input
              id="email"
              type="text"
              placeholder="Tytuł"
              v-model="form.title"
              class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
              required
            />
            <div
              v-if="error.title"
              class="py-2 px-3 text-white bg-red-600 mb-5"
            >
              {{ error.title[0] }}
            </div>
            <label for="description" class="text-lg">Opis</label>
            <input
              id="description"
              type="text"
              placeholder="Opis"
              v-model="form.description"
              class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
            />
            <label for="tags" class="text-lg">Tagi</label>
            <input
              id="tags"
              type="text"
              placeholder="Tagi"
              v-model="form.tags"
              class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
            />
            <label for="category" class="text-lg">Kategoria</label>
            <input
              id="category"
              type="text"
              placeholder="Kategoria"
              v-model="form.category"
              class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
            />
            <label for="thumbnail" class="text-lg">Miniaturka</label>
            <input
              id="thumbnail"
              type="file"
              placeholder="Plik"
              v-on:change="thumbUpload"
              class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
            />
            <div
              v-if="error.thumbnail"
              class="py-2 px-3 text-white bg-red-600 mb-5"
            >
              {{ error.thumbnail }}
            </div>
            <label class="flex items-center space-x-3">
              <input
                v-model="form.public"
                name="public"
                type="checkbox"
                true-value="1"
                false-value="0"
                class="appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
              />
              <span class="text-gray-900 font-medium">Publikuj</span>
            </label>
            <hr class="my-5 border-solid border border-gray-100" />
            <button
              type="submit"
              class="py-3 px-4 text-lg font-medium bg-pink-600 text-white hover:bg-pink-100 hover:text-black appearance-none focus:outline-none inline-block w-32 shadow-lg"
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
export default {
  name: "BlogAdd",
  components: {
    Theme: () => import("@/components/Layouts/Theme.vue"),
    Editor: () => import("@/components/Editor.vue"),
  },
  data() {
    return {
      form: {},
      file: null,
      error: {
        name: null,
        title: null,
        thumbnail: null,
      },
    };
  },
  methods: {
    add() {
      this.error = {
        name: null,
        title: null,
        thumbnail: null,
      };
      this.$store
        .dispatch("addBlog", {
          name: this.form.name,
          title: this.form.title,
          description: this.form.description,
          tags: this.form.tags,
          text: this.form.text || "",
          category: this.form.category,
          thumbnail: this.file,
          public: this.form.public || 0,
        })
        .then(() => {
          this.$toasted.success("Zapisane!");
          this.$router.push({
            name: "Blogs",
          });
        })
        .catch((e) => {
          this.error = e.response.data.errors ?? e.response.data;
          this.$toasted.error("Error!");
        });
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
