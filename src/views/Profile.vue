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
          <h2 class="text-xl font-semibold">Profil użytkownika</h2>
        </div>
      </div>
      <div class="container mx-auto px-4 py-10">
        <form class="w-full lg:w-1/2" @submit.prevent="edit">
          <label for="name" class="text-lg">Nazwa użytkownika*</label>
          <input
            id="name"
            type="text"
            placeholder="Nazwa użytkownika"
            v-model="user.name"
            class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
            required
          />
          <div v-if="error.name" class="py-2 px-3 text-white bg-red-600 mb-5">
            {{ error.name[0] }}
          </div>
          <label for="email" class="text-lg">Email*</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            v-model="user.email"
            class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
            required
          />
          <div v-if="error.email" class="py-2 px-3 text-white bg-red-600 mb-5">
            {{ error.email[0] }}
          </div>
          <label for="password" class="text-lg">Hasło</label>
          <input
            id="password"
            type="password"
            placeholder="Hasło"
            v-model="user.password"
            class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
          />
          <label for="password_confirmation" class="text-lg"
            >Powtórz hasło</label
          >
          <input
            id="password_confirmation"
            type="password"
            placeholder="Powtórz hasło"
            v-model="user.password_confirmation"
            class="py-3 px-4 bg-gray-50 placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-1 focus:ring-pink-600 mt-2 mb-5"
          />
          <div
            v-if="error.password"
            class="py-2 px-3 text-white bg-red-600 mb-5"
          >
            {{ error.password[0] }}
          </div>
          <hr class="my-5 border-solid border border-gray-100" />
          <button
            type="submit"
            class="py-3 px-4 text-lg font-medium bg-pink-600 text-white hover:bg-pink-100 hover:text-black appearance-none focus:outline-none inline-block w-32 shadow-lg"
          >
            Zapisz
          </button>
        </form>
      </div>
    </div>
  </Theme>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Profile",
  components: {
    Theme: () => import("@/components/Layouts/Theme.vue"),
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["user"]),
  },
  created() {
    this.$store
      .dispatch("getUser")
      .then(() => {
        this.loading = true;
      })
      .catch(() => {
        this.$router.go();
      });
  },
  data() {
    return {
      loading: false,
      error: {
        name: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    edit() {
      this.error = {
        name: null,
        email: null,
        password: null,
      };
      this.$store
        .dispatch("updateUser", this.user)
        .then(() => {
          this.$toasted.success("Zapisane!");
        })
        .catch((e) => {
          this.error = e.response.data.errors ?? e.response.data;
          this.$toasted.error("Error!");
        });
    },
  },
};
</script>
