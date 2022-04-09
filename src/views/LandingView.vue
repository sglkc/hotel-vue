<template>
  <v-parallax class="h-100vh" :src="image">
    <v-container class="h-100">
      <v-row
        class="h-100"
        align="center"
        data-aos="fade-up"
        data-aos-delay="500"
        data-aos-duration="500"
        data-aos-mirror="true"
      >
        <v-col align="center">
          <v-card variant="text">
            <v-card-title class="ps-3">
              <h1 id="title" class="pa-3">Welcome to the hotel</h1>
            </v-card-title>
            <v-card-actions class="ps-3">
              <v-btn variant="contained-text">Placeholder</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
  <div style="min-height: 600px"></div>
</template>

<style scoped>
.h-100vh {
  height: 100vh;
}

.h-100 {
  height: 100%;
}

#title {
  background-color: #0000007f;
  color: white;
  border-radius: 0 5px 5px 0;
}
</style>

<script>
import AOS from "aos";
import image from "@/assets/landing.jpg";

export default {
  name: "LandingView",
  data() {
    return {
      image,
    };
  },
  mounted() {
    AOS.init();
  },
};
</script>
