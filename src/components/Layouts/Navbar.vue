<template>
  <nav class="bg-pink-600 w-full">
    <div class="flex items-center justify-between h-full mx-auto text-white">
      <button
        class="md:hidden focus:outline-none p-4 hover:text-black"
        :class="{ 'text-black': menuOpen }"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="hidden md:block">
        <Links />
      </div>
      <UserNavbar />
    </div>
    <transition name="slide-fade">
      <Links class="flex-col" v-show="menuOpen" />
    </transition>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  components: {
    Links: () => import("@/components/Layouts/Links.vue"),
    UserNavbar: () => import("@/components/Layouts/UserNavbar.vue"),
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
