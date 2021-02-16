<template>
  <Theme>
    <div class="container mx-auto px-4 py-10" v-if="!loading">
      Pobieranie danych...
    </div>
    <div class="w-full" v-if="loading">
      <div class="bg-pink-200">
        <div
          class="container mx-auto flex items-center justify-between px-5 h-20"
        >
          <h2 class="text-xl font-semibold">Blog</h2>
          <div>
            <router-link
              to="/blog/add"
              class="lg:w-32 py-3 px-4 font-medium bg-pink-600 text-white hover:bg-white hover:text-black appearance-none focus:outline-none inline-block w-full shadow-lg"
              tag="button"
            >
              Dodaj
            </router-link>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-10 pt-10">
        <div class="mb-4 flex justify-between items-center">
          <div class="flex-1 pr-4">
            <div class="relative md:w-1/3">
              <input
                v-model="search"
                type="text"
                class="w-full pl-10 pr-4 py-2 shadow focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-pink-600 bg-gray-50 placeholder-gray-800 text-gray-900 font-medium"
                placeholder="Wyszukaj"
              />
              <button
                class="absolute top-0 left-0 inline-flex items-center p-2 focus:outline-none"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                  <circle cx="10" cy="10" r="7"></circle>
                  <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </Theme>
</template>

<script>
export default {
  name: "Blogs",
  components: {
    Theme: () => import("@/components/Layouts/Theme.vue"),
  },
  watch: {
    $route: "fetch",
    search: "find",
  },
  created() {
    this.fetch();
  },
  data() {
    return {
      loading: false,
      search: this.$route.params.search || "",
    };
  },
  methods: {
    fetch() {
      if (this.$route.params.search) {
        if (Number(this.$route.params.id)) {
          this.searchItems();
        } else {
          this.$router.push("/error");
        }
      } else {
        this.search = "";
        if (Number(this.$route.params.id || 1)) {
          this.allItems();
        } else {
          this.$router.push("/error");
        }
      }
    },
    allItems() {
      this.$store
        .dispatch("getBlogs", Number(this.$route.params.id))
        .then(() => {
          this.loading = true;
        })
        .catch(() => {
          this.$router.go();
        });
    },
    searchItems() {
      this.$store
        .dispatch("searchBlogs", {
          route: this.$route.params.id,
          search: this.search,
        })
        .then(() => {
          this.loading = true;
        })
        .catch(() => {
          this.$router.go();
        });
    },
    find() {
      if (this.search != "") {
        this.$router.push("/blogs/" + this.search.trim() + "/1");
      } else {
        if (this.$route.name != "BlogsID") {
          this.$router.push("/blogs/1");
        }
      }
    },
  },
};
</script>
