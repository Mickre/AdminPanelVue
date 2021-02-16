<template>
  <Theme>
    <div class="container px-4 py-10 mx-auto" v-if="!loading">
      Pobieranie danych...
    </div>
    <div class="w-full" v-if="loading">
      <div class="bg-pink-200">
        <div
          class="container flex items-center justify-between h-20 px-5 mx-auto"
        >
          <h2 class="text-xl font-semibold">Obrazy</h2>
        </div>
      </div>
      <div class="container p-10 mx-auto">
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="item in images"
            :key="item.id"
            class="p-5 hover:bg-gray-50"
          >
            <img
              :src="`${url}/storage/blog/${item.name}`"
              class="object-cover w-full h-48"
            />
            <div
              class="flex items-center justify-between border-t border-gray-200 border-dashed"
            >
              <span class="px-6 py-3 text-gray-700">{{ item.id }}</span>
              <span class="px-6 py-3 text-gray-700">
                <button
                  @click.prevent="remove(item.id)"
                  class="inline-block w-16 px-2 py-2 text-sm font-medium text-white bg-red-500 shadow-lg appearance-none hover:bg-pink-600 focus:outline-none"
                >
                  Usuń
                </button>
              </span>
            </div>
          </div>
        </div>
        <div
          class="grid px-4 mt-6 text-xs font-semibold tracking-wide text-gray-900 uppercase border-t sm:grid-cols-9"
          v-if="metaImages.last_page > 1"
        >
          <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul class="inline-flex items-center">
                <li v-if="metaImages.current_page != 1">
                  <router-link
                    :to="`/images/${metaImages.current_page - 1}`"
                    class="px-3 py-1"
                    aria-label="Previous"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </router-link>
                </li>
                <li
                  v-for="pageNumber in metaImages.last_page"
                  :key="pageNumber"
                >
                  <router-link
                    :to="`/images/${pageNumber}`"
                    class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                    :class="{
                      ' font-bold': $route.params.id == pageNumber,
                    }"
                    >{{ pageNumber }}</router-link
                  >
                </li>
                <li v-if="metaImages.current_page != metaImages.last_page">
                  <router-link
                    :to="`/images/${metaImages.current_page + 1}`"
                    class="px-3 py-1"
                    aria-label="Next"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </router-link>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  </Theme>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Images",
  components: {
    Theme: () => import("@/components/Layouts/Theme.vue"),
  },
  computed: {
    ...mapState(["images", "metaImages"]),
    ...mapGetters(["images", "metaImages"]),
  },
  watch: {
    $route: "fetch",
  },
  created() {
    this.fetch();
  },
  data() {
    return {
      loading: false,
      url: "https://miauketing.pl",
    };
  },
  methods: {
    fetch() {
      this.$store
        .dispatch("getImages", Number(this.$route.params.id))
        .then(() => {
          this.loading = true;
        })
        .catch(() => {
          this.$router.go();
        });
    },
    remove(id) {
      var page = this.metaImages.current_page;
      if (this.images.length == 1 && this.metaImages.last_page != 1) {
        page = this.metaImages.last_page - 1;
      }
      this.$store
        .dispatch("deleteImage", {
          id: id,
          route: page,
        })
        .then(() => {
          this.$toasted.success("Usunięte!");
          if (this.images.length == 1 && this.metaImages.last_page != 1) {
            this.$router.push(`/images/${page}`);
          }
        })
        .catch(() => {
          this.$toasted.error("Error!");
        });
    },
  },
};
</script>
