<template>
  <div>
    <Navbar />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Theme",
  components: {
    Navbar: () => import("@/components/Layouts/Navbar.vue"),
  },
};
</script>
