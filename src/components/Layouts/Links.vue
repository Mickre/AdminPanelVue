<template>
  <ul class="flex text-white">
    <li>
      <router-link
        class="inline-flex items-center w-full p-4 font-semibold hover:bg-pink-800"
        to="/blogs"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span class="ml-2">Blog</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-flex items-center w-full p-4 font-semibold hover:bg-pink-800"
        to="/images"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span class="ml-2">Obrazy</span>
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-flex items-center w-full p-4 font-semibold hover:bg-pink-800 md:hidden"
        to="/profile"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span class="ml-2">Profil</span>
      </router-link>
    </li>
    <li>
      <button
        class="inline-flex items-center w-full p-4 font-semibold hover:bg-pink-800 md:hidden focus:outline-none"
        @click="logout"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
        <span class="ml-2">Wyloguj</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Links",
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
        this.$toasted.success("Wylogowano!");
      });
    },
  },
};
</script>
