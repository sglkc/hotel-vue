<template>
  <Home />
  <Facilities />
</template>

<style>
.h-100vh {
  min-height: 100vh;
}

.h-100 {
  height: 100%;
}

.v-parallax .v-responsive__sizer {
  padding-bottom: 0 !important;
}
</style>

<script>
import AOS from "aos";
import Facilities from "@/components/landing/Facilities.vue";
import Home from "@/components/landing/Home.vue";

export default {
  name: "LandingView",
  components: {
    Facilities,
    Home,
  },
  mounted() {
    AOS.init();
  },
};
</script>
