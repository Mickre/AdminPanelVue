<template>
  <section
    class="w-full min-h-screen lg:flex lg:justify-center lg:items-center lg:bg-pink-200"
  >
    <div class="flex flex-col w-full lg:w-1/3 bg-white p-10">
      <h1 class="text-2xl font-medium pb-5">Login</h1>
      <div v-if="errorMessage" class="py-2 px-3 text-white bg-red-600 mb-5">
        {{ errorMessage }}
      </div>
      <form class="w-full flex flex-col" @submit.prevent="login">
        <label for="email" class="pb-2 text-lg">Email </label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          v-model="email"
          class="py-3 px-4 bg-white placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        <label for="email" class="pb-2 pt-4 text-lg">Hasło</label>
        <input
          type="password"
          placeholder="Hasło"
          v-model="password"
          class="py-3 px-4 bg-white placeholder-gray-800 text-gray-900 appearance-none inline-block w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
        <button
          type="submit"
          class="mt-6 py-3 px-4 text-lg font-medium bg-pink-600 text-white hover:bg-pink-100 hover:text-black appearance-none focus:outline-none inline-block w-full shadow-lg"
        >
          Zaloguj
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      error: null,
      email: "",
      password: "",
    };
  },
  computed: {
    errorMessage() {
      const { error } = this;
      if (!error || typeof error === "string") {
        return error;
      }
      let msg = "";
      if (error.message) {
        msg += error.message;
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, "")
          .replace(/:/g, ": ")
          .replace(/,/g, " ")})`;
      }
      return msg;
    },
  },
  methods: {
    login() {
      this.error = null;
      this.$store
        .dispatch("login", {
          username: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/blogs");
          this.$toasted.success("Zalogowano!");
        })
        .catch((e) => {
          this.error = e.response ? e.response.data : e.toString();
          this.$toasted.error("Problem z autoryzacją.");
        });
    },
  },
};
</script>
