<template>
  <section id="reservation">
    <v-parallax class="h-100vh" :src="image">
      <v-container class="my-12 py-12 h-100vh">
        <v-row justify="center">
          <v-col align="center" cols="auto">
            <AuthForm v-if="!loggedIn" user />
            <ReservationForm v-else />
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>

<script>
import axios from "axios";
import AuthForm from "@/components/AuthForm.vue";
import ReservationForm from "@/components/landing/ReservationForm.vue";
import image from "@/assets/reservation.jpg";

export default {
  name: "Reservation",
  components: {
    AuthForm,
    ReservationForm,
  },
  data() {
    return {
      image,
      loggedIn: false,
    };
  },
  methods: {
    refresh(e) {
      this.loggedIn = e;
    },
  },
  created() {
    this.emitter.on("refreshView", this.refresh);

    if (!this.store.state.JWT_TOKEN) return (this.loggedIn = false);

    axios
      .post(import.meta.env.VITE_API + "/auth/verify", {
        token: this.store.state.JWT_TOKEN,
      })
      .then(() => {
        this.loggedIn = true;
      })
      .catch(() => {
        this.loggedIn = false;
        this.store.commit("setUser", false);
      });
  },
};
</script>
