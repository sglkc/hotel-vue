<template>
  <v-navigation-drawer rail-width="52" expand-on-hover rail permanent>
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="(item, i) in items"
        class="ps-2"
        :active="isactive(item.link)"
        :key="i"
        :prepend-icon="item.icon"
        :title="item.title"
        @click="goto(item.link)"
      ></v-list-item>
      <span v-if="isstaff" disabled>
        <v-list-item
          v-for="(item, i) in staff"
          class="ps-2"
          :active="isactive(item.link)"
          :key="i + 10"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="goto(item.link)"
        ></v-list-item>
      </span>
      <span v-if="isadmin">
        <v-list-item
          v-for="(item, i) in admin"
          class="ps-2"
          :active="isactive(item.link)"
          :key="i + 20"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="goto(item.link)"
        ></v-list-item>
      </span>
    </v-list>
    <span v-if="store.state.USER">
      <v-divider></v-divider>
      <v-list density="comfortable" nav>
        <v-list-item
          class="ps-2"
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
        >
        </v-list-item>
      </v-list>
    </span>
  </v-navigation-drawer>
</template>

<style scoped>
.v-list {
  overflow: hidden;
}

.v-list-group__items .v-list-item {
  padding-inline-start: 8px !important;
}
</style>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      rail: true,
      current: this.$router.currentRoute._value.name,
      items: [
        { title: "Home", icon: "mdi-home", link: "home" },
        { title: "Staff", icon: "mdi-account-key", link: "staff" },
      ],
      staff: [
        { title: "Reservations", icon: "mdi-receipt", link: "reservations" },
      ],
      admin: [
        { title: "Rooms", icon: "mdi-bed-king", link: "rooms" },
        { title: "Room Types", icon: "mdi-tag-multiple", link: "roomtypes" },
        {
          title: "Room Facilities",
          icon: "mdi-lamp",
          link: "roomfacilities",
        },
        { title: "Facilities", icon: "mdi-room-service", link: "facilities" },
      ],
    };
  },
  computed: {
    isstaff() {
      return (
        this.store.state.USER.role_name === "admin" ||
        this.store.state.USER.role_name === "receptionist"
      );
    },
    isadmin() {
      return this.store.state.USER.role_name === "admin";
    },
  },
  methods: {
    isactive(link) {
      return this.current === link;
    },
    goto(link) {
      this.$router.push({ name: link });
      this.current = link;
    },
    onClickOutside() {
      this.rail = false;
    },
    logout() {
      window.localStorage.clear();
      location.reload();
    },
  },
  beforeMounted() {
    this.current = this.$router.currentRoute._value.name;
  },
};
</script>
