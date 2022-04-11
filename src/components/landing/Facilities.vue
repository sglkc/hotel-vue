<template>
  <section id="facilities">
    <v-container class="py-15 mb-10 h-100vh d-flex flex-column">
      <h1
        class="my-5 text-center"
        data-aos="fade-down"
        data-aos-anchor-placement="bottom-bottom"
      >
        Our Facilities
      </h1>
      <carousel
        id="carousel"
        class="mx-6 mx-md-0"
        :autoplay="5000"
        :itemsToShow="3 / 2"
        wrapAround
      >
        <slide v-for="(facility, i) in facilities" :key="i">
          <v-card width="450">
            <v-img
              class="text-white align-end"
              height="300"
              :src="facility.image || notfound"
              cover
              eager
            >
              <div class="card-content pb-3">
                <v-card-title class="pb-0">{{ facility.name }}</v-card-title>
                <v-card-subtitle class="text-left text-high-emphasis">
                  {{ facility.notes }}
                </v-card-subtitle>
              </div>
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center h-100">
                  <v-progress-circular indeterminate></v-progress-circular>
                </div>
              </template>
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
  </section>
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
  background: linear-gradient(#f3f3f3 70%, white);
}

#carousel {
  background-color: #7acbff2f;
  padding-top: 2rem;
  padding-bottom: 1rem;
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
