<template>
  <v-app>
    <Sidebar v-if="isStaff" />
    <Navbar v-else />
    <v-main id="main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
#main {
  padding-top: 0 !important;
  min-height: 100vh;
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Hotel",
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    isStaff() {
      return this.$router.currentRoute.value.path.includes("staff");
    },
  },
};
</script>
