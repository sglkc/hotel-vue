<template>
  <v-navigation-drawer rail-width="52" expand-on-hover rail permanent>
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="(item, i) in items"
        class="px-2"
        :key="i"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="this.$router.push({ name: item.link })"
      >
      </v-list-item>
    </v-list>
    <span v-if="store.state.USER">
      <v-divider></v-divider>
      <v-list density="comfortable" nav>
        <v-list-item
          class="px-2"
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
        >
        </v-list-item>
      </v-list>
    </span>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      rail: true,
      items: [
        { title: "Home", icon: "mdi-home", link: "home" },
        { title: "Staff", icon: "mdi-account", link: "staff" },
        { title: "Rooms", icon: "mdi-bed-king", link: "rooms" },
        { title: "Room Types", icon: "mdi-tag-multiple", link: "roomtypes" },
        { title: "Facilities", icon: "mdi-room-service", link: "facilities" },
      ],
    };
  },
  methods: {
    onClickOutside() {
      this.rail = false;
    },
    logout() {
      window.localStorage.clear();
      location.reload();
    },
  },
};
</script>
