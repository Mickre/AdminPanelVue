<template>
  <Theme>
    <div class="container mx-auto p-10">
      <div></div>
      <h1 class="text-3xl font-semibold pb-5">Strona nie znaleziona</h1>
      <p class="text-lg">
        Wróć na
        <router-link to="/" class="text-red-800 hover:underline"
          >stronę główną</router-link
        >
      </p>
    </div>
  </Theme>
</template>

<script>
export default {
  name: "Error",
  components: {
    Theme: () => import("@/components/Layouts/Theme.vue"),
  },
};
</script>
