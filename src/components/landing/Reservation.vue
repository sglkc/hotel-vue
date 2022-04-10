<template>
  <section id="reservation">
    <v-parallax class="h-100vh" :src="image">
      <v-container class="my-12 py-12 h-100vh">
        <v-row justify="center">
          <v-col align="center" cols="auto">
            <AuthForm title="Make A Reservation" user />
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import image from "@/assets/reservation.jpg";

export default {
  name: "Reservation",
  components: {
    AuthForm,
  },
  data() {
    return {
      image,
    };
  },
};
</script>
