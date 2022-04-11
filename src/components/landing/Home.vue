<template>
  <section id="home">
    <v-parallax class="h-100vh" :src="image">
      <v-container class="h-100" fluid>
        <v-row
          class="h-100"
          align="center"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-mirror="true"
        >
          <v-col class="ps-0" align="center" cols="auto">
            <v-card id="title" class="ps-10 pe-3 py-4" variant="text">
              <v-card-title>
                <h1>Welcome to the hotel</h1>
              </v-card-title>
              <v-card-subtitle class="my-2 text-high-emphasis font-italic">
                a perfect combination of homely ambience and modern amenities
              </v-card-subtitle>
              <v-card-actions class="ps-3">
                <v-btn
                  v-for="(page, i) in pages"
                  variant="outlined"
                  :key="i"
                  :prepend-icon="page.icon"
                  @click="scrollTo(page.id)"
                >
                  {{ page.title }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>

<style scoped>
#title {
  background: conic-gradient(from -90deg at 50% -25%, #0066ff3f, #8769ff);
  color: white;
  border-radius: 0 15px 15px 0;
}
</style>

<script>
import image from "@/assets/landing.jpg";

export default {
  name: "Landing",
  data() {
    return {
      image,
      pages: [
        { title: "Facilities", icon: "mdi-room-service", id: "#facilities" },
        { title: "Room Types", icon: "mdi-bed-king", id: "#types" },
        { title: "Reservation", icon: "mdi-calendar", id: "#reservation" },
      ],
    };
  },
  methods: {
    scrollTo(id) {
      this.$router.push(id);
    },
  },
};
</script>
