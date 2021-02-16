<template>
  <ul class="items-center flex-shrink-0 hidden space-x-6 md:flex">
    <li class="relative">
      <button
        class="flex items-center p-4 align-middle focus:shadow-outline-purple focus:outline-none hover:bg-pink-800"
        @click="toggleProfileMenu"
        aria-label="Account"
        aria-haspopup="true"
      >
        <img
          class="object-cover w-6 h-6 rounded-full"
          src="@/assets/img/profile.jpg"
          alt="Profil"
          aria-hidden="true"
        />
      </button>
      <transition name="fade">
        <template v-if="isProfileMenuOpen">
          <ul
            @click="closeProfileMenu"
            class="absolute right-0 w-56 p-2 mr-4 -mt-4 space-y-2 text-gray-900 bg-white border-gray-700 rounded-md shadow-md"
            aria-label="submenu"
          >
            <li class="flex">
              <router-link
                class="inline-flex items-center w-full px-2 py-2 text-sm font-semibold rounded-md hover:bg-pink-600 hover:text-white"
                to="/profile"
              >
                <svg
                  class="w-4 h-4 mr-3"
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
                <span>Profil</span>
              </router-link>
            </li>
            <li class="flex">
              <button
                @click="logout"
                class="inline-flex items-center w-full px-2 py-2 text-sm font-semibold rounded-md hover:bg-pink-600 hover:text-white"
              >
                <svg
                  class="w-4 h-4 mr-3"
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
                <span>Wyloguj</span>
              </button>
            </li>
          </ul>
        </template>
      </transition>
    </li>
  </ul>
</template>

<script>
export default {
  name: "UserNavbar",
  data() {
    return {
      isProfileMenuOpen: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
        this.$toasted.success("Wylogowano!");
      });
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
  },
};
</script>
