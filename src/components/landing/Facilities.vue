<template>
  <div id="facilities">
    <v-container class="h-100vh d-flex flex-column">
      <v-spacer></v-spacer>
      <h1
        class="mb-5 text-center"
        data-aos="fade-down"
        data-aos-anchor-placement="bottom-bottom"
      >
        Our Facilities
      </h1>
      <carousel id="carousel" :autoplay="5000" :itemsToShow="3 / 2" wrapAround>
        <slide v-for="(facility, i) in facilities" :key="i">
          <v-card width="450">
            <v-img
              class="text-white align-end"
              height="300"
              :src="facility.image || notfound"
              cover
            >
              <div class="card-content pb-3">
                <v-card-title class="pb-0">{{ facility.name }}</v-card-title>
                <v-card-subtitle>{{ facility.notes }}</v-card-subtitle>
              </div>
            </v-img>
          </v-card>
        </slide>
        <template #addons>
          <navigation />
          <pagination class="mt-3" />
        </template>
      </carousel>
      <div
        class="text py-6 px-4 px-sm-15 mx-4 mx-sm-15"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        align="center"
      >
        <div class="mb-1 font-weight-black font-italic">
          We provide the best experience even before you became our customer.
        </div>
        <div>{{ description }}</div>
      </div>
    </v-container>
  </div>
</template>

<style>
:root {
  --vc-clr-primary: #3d435e;
  --vc-clr-secondary: #aaaaaa7f;
  --vc-nav-width: 42px;
  --vc-pgn-width: 32px;
  --vc-pgn-height: 12px;
}

#facilities {
  background: #f9f9f9;
}

#carousel {
  padding-top: 2rem;
  padding-bottom: 1rem;
  background: conic-gradient(from 0.5turn at bottom left, #add8e67f, #beced33f);
  border-radius: 10px;
}

.carousel__pagination-button {
  transition: background-color 0.3s;
}

.card-content {
  background-color: #0000003f;
}
</style>

<script>
import axios from "axios";
import notfound from "@/assets/notfound.png";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "Facilities",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      notfound,
      facilities: null,
      description: `
      From the minute you step through the doors, you are greeted with a warm
      welcome and a smile. The staff is very friendly and knowledgeable about
      the local area. The rooms are clean and well maintained. The hotel is a
      very short walk to the beach and restaurants.
      `,
    };
  },
  created() {
    axios
      .get(import.meta.env.VITE_API + "/services/facilities")
      .then((res) => {
        this.facilities = res.data.result;
      })
      .catch(console.error);
  },
};
</script>
