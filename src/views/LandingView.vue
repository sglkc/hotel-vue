<template>
  <Home />
  <Facilities />
  <Types />
  <Footer />
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
import Types from "@/components/landing/Types.vue";
import Footer from "@/components/landing/Footer.vue";

export default {
  name: "LandingView",
  components: {
    Facilities,
    Home,
    Types,
    Footer,
  },
  mounted() {
    AOS.init();
  },
};
</script>
