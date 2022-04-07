<template>
  <v-app>
    <Sidebar v-if="isStaff" />
    <Navbar v-else id="navbar" />
    <v-main style="min-height: 100vh">
      <router-view></router-view>
    </v-main>
    <v-container style="height: 500px"></v-container>
  </v-app>
</template>

<style scoped>
#navbar {
  position: fixed;
  z-index: 1;
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
