<template>
  <v-app>
    <NavigationBar v-if="isStaff" />
    <v-main style="min-height: 100vh">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "Hotel",
  components: {
    NavigationBar,
  },
  computed: {
    isStaff() {
      return this.$router.currentRoute.value.path.includes("staff");
    },
  },
};
</script>
