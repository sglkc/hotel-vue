<template>
  <div id="navbar" class="px-5 text-white">
    <h1>Hotel</h1>
    <v-spacer></v-spacer>
    <v-btn
      v-for="(item, i) in items"
      class="py-5"
      density=""
      variant="text"
      :key="i"
      :prepend-icon="item.icon"
      @click="this.$router.push({ name: item.link })"
    >
      {{ item.title }}
    </v-btn>
  </div>
</template>

<style scoped>
#navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 100%;
}
</style>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", link: "home" },
        { title: "Rooms", icon: "mdi-bed-king", link: "rooms" },
        { title: "Room Types", icon: "mdi-tag-multiple", link: "roomtypes" },
        { title: "Facilities", icon: "mdi-room-service", link: "facilities" },
        { title: "Staff", icon: "mdi-account", link: "staff" },
      ],
    };
  },
};
</script>
