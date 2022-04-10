<template>
  <v-btn
    id="button"
    class="transition"
    color="primary"
    :class="{ hidden: !scrolled }"
    @click="scrollToTop"
    icon
  >
    <v-icon class="transition" :class="{ hidden: !scrolled }">
      mdi-chevron-up
    </v-icon>
  </v-btn>
</template>

<style scoped>
#button {
  margin-right: min(100vw, 5vw);
  margin-bottom: 3vw;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.transition {
  transition: transform, 0.5s;
}

.hidden {
  transform: scale(0);
}
</style>

<script>
export default {
  name: "ScrollToTop",
  data() {
    return {
      scrollY: 0,
    };
  },
  computed: {
    scrolled() {
      return this.scrollY > 256;
    },
    ismobile() {
      return this.$vuetify.display.xs || this.$vuetify.display.sm;
    },
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
