<template>
  <div class="container mx-auto px-10">
    <div class="shadow-lg">
      <table class="border-collapse table-fixed w-full relative">
        <thead>
          <tr class="text-left">
            <th
              class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
            >
              ID
            </th>
            <th
              class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
            >
              Nazwa
            </th>
            <th
              class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
            >
              Tytuł
            </th>
            <th
              class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
            >
              Opublikowane
            </th>
            <th
              class="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs"
            >
              Opcje
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in blogs" :key="item.id" class="hover:bg-gray-50">
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">
                {{ item.id }}
              </span>
            </td>
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">{{
                item.name
              }}</span>
            </td>
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">{{
                item.title
              }}</span>
            </td>
            <td class="border-dashed border-t border-gray-200">
              <span
                class="text-gray-700 px-6 py-3 flex items-center"
                v-if="item.public == 1"
                >Tak</span
              >
              <span class="text-gray-700 px-6 py-3 flex items-center" v-else
                >Nie</span
              >
            </td>
            <td class="border-dashed border-t border-gray-200">
              <span class="text-gray-700 px-6 py-3 flex items-center">
                <div class="mx-2">
                  <router-link
                    tag="button"
                    :to="`/blog/${item.id}`"
                    class="w-16 py-2 px-2 font-medium hover:bg-pink-600 hover:text-white bg-white text-black appearance-none focus:outline-none inline-block shadow-lg text-sm"
                  >
                    Edytuj
                  </router-link>
                </div>
                <div class="mx-2">
                  <button
                    @click.prevent="remove(item.id)"
                    class="w-16 py-2 px-2 font-medium hover:bg-pink-600 text-white bg-red-500 appearance-none focus:outline-none inline-block shadow-lg text-sm"
                  >
                    Usuń
                  </button>
                </div>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="px-4 mt-6 text-xs font-semibold tracking-wide uppercase border-t sm:grid-cols-9 text-gray-900"
      v-if="metaBlogs.last_page > 1"
    >
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul class="inline-flex items-center">
            <li v-if="metaBlogs.current_page != 1">
              <router-link
                :to="`/blogs/${search}/${metaBlogs.current_page - 1}`"
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
            <li v-for="pageNumber in metaBlogs.last_page" :key="pageNumber">
              <router-link
                :to="`/blogs/${search}/${pageNumber}`"
                class="px-3 py-1 rounded-md focus:outline-none"
                :class="{
                  ' font-bold': $route.params.id == pageNumber,
                }"
                >{{ pageNumber }}</router-link
              >
            </li>
            <li v-if="metaBlogs.current_page != metaBlogs.last_page">
              <router-link
                :to="`/blogs/${search}/${metaBlogs.current_page + 1}`"
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
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BlogIndex",
  computed: {
    ...mapState(["blogs", "metaBlogs"]),
    ...mapGetters(["blogs", "metaBlogs"]),
  },
  data() {
    return {
      search: this.$route.params.search || "",
    };
  },
  methods: {
    remove(id) {
      var page = this.metaBlogs.current_page;
      if (this.blogs.length == 1 && this.metaBlogs.last_page != 1) {
        page = this.metaBlogs.last_page - 1;
      }
      this.$store
        .dispatch("deleteBlog", {
          id: id,
          route: page,
        })
        .then(() => {
          this.$toasted.success("Usunięte!");
          if (this.blogs.length == 1 && this.metaBlogs.last_page != 1) {
            this.$router.push(`/blogs/${this.search}/${page}`);
          }
        })
        .catch(() => {
          this.$toasted.error("Error!");
        });
    },
  },
};
</script>
