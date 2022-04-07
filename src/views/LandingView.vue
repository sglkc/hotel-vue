<template>
  <v-parallax class="h-100vh" :src="image">
    <v-container class="mt-15">
      <v-row align="center" justify="center">
        <v-col class="text-center">
          <h1>Hello World</h1>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<style scoped>
.h-100vh {
  height: 100vh;
}
</style>

<script>
import image from "@/assets/landing.jpg";

export default {
  name: "LandingView",
  data() {
    return {
      image: image,
    };
  },
};
</script>
