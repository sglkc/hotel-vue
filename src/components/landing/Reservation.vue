<template>
  <section id="reservation">
    <v-parallax class="h-100vh" :src="image">
      <v-container class="my-12 py-12 h-100vh">
        <v-row
          justify="center"
          data-aos="flip-up"
          data-aos-anchor-placement="top-center"
        >
          <v-col
            align="center"
            :cols="form ? 8 : 12"
            :sm="form ? 7 : 11"
            :md="form ? 6 : 11"
            :lg="form ? 4 : 9"
          >
            <v-expand-transition>
              <div v-show="!loggedIn">
                <AuthForm user />
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-show="loggedIn && form">
                <ReservationForm />
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-show="loggedIn && !form">
                <ReservationTable />
              </div>
            </v-expand-transition>
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
import ReservationTable from "@/components/landing/ReservationTable.vue";
import image from "@/assets/reservation.jpg";

export default {
  name: "Reservation",
  components: {
    AuthForm,
    ReservationForm,
    ReservationTable,
  },
  data() {
    return {
      image,
      loggedIn: false,
      form: true,
    };
  },
  methods: {
    refresh(e) {
      this.loggedIn = e;
    },
    toggleForm(e) {
      this.form = e;
    },
  },
  created() {
    this.emitter.on("refreshView", this.refresh);
    this.emitter.on("toggleForm", this.toggleForm);

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
      });
  },
};
</script>
