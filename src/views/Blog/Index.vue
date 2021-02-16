<template>
  <div class="container px-10 mx-auto">
    <div class="shadow-lg">
      <table class="relative w-full border-collapse table-auto lg:table-fixed">
        <thead>
          <tr class="text-left">
            <th
              class="sticky top-0 px-6 py-2 text-xs font-bold tracking-wider text-gray-600 uppercase bg-gray-100 border-b border-gray-200"
            >
              ID
            </th>
            <th
              class="sticky top-0 px-6 py-2 text-xs font-bold tracking-wider text-gray-600 uppercase bg-gray-100 border-b border-gray-200"
            >
              Nazwa
            </th>
            <th
              class="sticky top-0 px-6 py-2 text-xs font-bold tracking-wider text-gray-600 uppercase bg-gray-100 border-b border-gray-200 "
            >
              Tytuł
            </th>
            <th
              class="sticky top-0 px-6 py-2 text-xs font-bold tracking-wider text-gray-600 uppercase bg-gray-100 border-b border-gray-200 "
            >
              Opublikowane
            </th>
            <th
              class="sticky top-0 px-6 py-2 text-xs font-bold tracking-wider text-gray-600 uppercase bg-gray-100 border-b border-gray-200"
            >
              Opcje
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in blogs" :key="item.id" class="hover:bg-gray-50">
            <td class="border-t border-gray-200 border-dashed">
              <span class="flex items-center px-6 py-3 text-gray-700">
                {{ item.id }}
              </span>
            </td>
            <td class="border-t border-gray-200 border-dashed">
              <span class="flex items-center px-6 py-3 text-gray-700">{{
                item.name
              }}</span>
            </td>
            <td class="border-t border-gray-200 border-dashed">
              <span class="flex items-center px-6 py-3 text-gray-700">{{
                item.title
              }}</span>
            </td>
            <td class="border-t border-gray-200 border-dashed">
              <span
                class="flex items-center px-6 py-3 text-gray-700"
                v-if="item.public == 1"
                >Tak</span
              >
              <span class="flex items-center px-6 py-3 text-gray-700" v-else
                >Nie</span
              >
            </td>
            <td class="border-t border-gray-200 border-dashed">
              <span
                class="flex flex-col items-center px-6 py-3 text-gray-700 lg:flex-row"
              >
                <div class="mx-2">
                  <router-link
                    tag="button"
                    :to="`/blog/${item.id}`"
                    class="inline-block w-16 px-2 py-2 text-sm font-medium text-black bg-white shadow-lg appearance-none hover:bg-pink-600 hover:text-white focus:outline-none"
                  >
                    Edytuj
                  </router-link>
                </div>
                <div class="mx-2">
                  <button
                    @click.prevent="remove(item.id)"
                    class="inline-block w-16 px-2 py-2 text-sm font-medium text-white bg-red-500 shadow-lg appearance-none hover:bg-pink-600 focus:outline-none"
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
      class="px-4 mt-6 text-xs font-semibold tracking-wide text-gray-900 uppercase border-t sm:grid-cols-9"
      v-if="metaBlogs.last_page > 1"
    >
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul class="inline-flex items-center">
            <li v-if="metaBlogs.current_page != 1">
              <router-link
                :to="`/blogs/${metaBlogs.current_page - 1}`"
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
                :to="`/blogs/${pageNumber}`"
                class="px-3 py-1 rounded-md focus:outline-none"
                :class="{
                  ' font-bold': $route.params.id == pageNumber,
                }"
                >{{ pageNumber }}</router-link
              >
            </li>
            <li v-if="metaBlogs.current_page != metaBlogs.last_page">
              <router-link
                :to="`/blogs/${metaBlogs.current_page + 1}`"
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
            this.$router.push(`/blogs/${page}`);
          }
        })
        .catch(() => {
          this.$toasted.error("Error!");
        });
    },
  },
};
</script>
