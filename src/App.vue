<template>
  <v-app>
    <Sidebar v-if="isStaff" />
    <Navbar v-else-if="!isReceipt" />
    <ScrollToTop v-if="!isReceipt" />
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
import ScrollToTop from "@/components/ScrollToTop.vue";

export default {
  name: "Hotel",
  components: {
    Navbar,
    Sidebar,
    ScrollToTop,
  },
  computed: {
    isStaff() {
      return this.$router.currentRoute.value.path.includes("staff");
    },
    isReceipt() {
      return this.$router.currentRoute.value.name === "receipt";
    },
  },
};
</script>
