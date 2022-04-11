<template>
  <v-app-bar
    id="navbar"
    class="pe-3 pe-sm-8"
    color="#0000007F"
    :elevation="scrolled ? '5' : '0'"
    :collapse="isxs"
    :height="scrolled ? '52' : '84'"
  >
    <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="d-flex d-sm-none"
          color="transparent"
          plain
          icon
        >
          <v-icon class="ma-5">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list density="comfortable" elevation="5" rounded>
        <v-list-item
          v-for="(item, i) in items"
          class="ps-2"
          :disabled="isactive(item.link)"
          :key="i"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="goto(item.link)"
        >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        v-for="(item, i) in items"
        class="py-5 d-none d-sm-flex"
        size="small"
        variant="text"
        :key="i"
        :prepend-icon="item.icon"
        @click="goto(item.link)"
      >
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style scoped>
#navbar {
  opacity: 1;
  transition-property: visibility, opacity, height, box-shadow, background;
  transition-duration: 0.3s;
  transition-delay: 0.3s, 0;
}

#navbar.hidden {
  opacity: 0;
  visibility: hidden;
}

#navbar * {
  color: white;
}

.v-app-bar--collapsed {
  max-width: min-content;
}
</style>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      scrollY: 0,
      current: this.$router.currentRoute._value.name,
      items: [
        { title: "Home", icon: "mdi-home", link: "#home" },
        { title: "Facilities", icon: "mdi-room-service", link: "#facilities" },
        { title: "Room Types", icon: "mdi-bed-king", link: "#types" },
        { title: "Reservation", icon: "mdi-calendar", link: "#reservation" },
        { title: "Staff", icon: "mdi-account-key", link: "/staff" },
      ],
    };
  },
  computed: {
    scrolled() {
      return this.scrollY > 10;
    },
    isxs() {
      return this.$vuetify.display.xs;
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    isactive(link) {
      return this.current === link;
    },
    goto(link) {
      this.$router.push(link);
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
  },
};
</script>
