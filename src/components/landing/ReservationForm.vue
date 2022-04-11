<template>
  <v-card color="#ffffff9f">
    <v-form>
      <v-card-title class="pa-5 pb-0 justify-center">
        Make a reservation here
      </v-card-title>
      <v-card-text>
        Welcome, {{ user.full_name }} ({{ user.email }})
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "ReservationForm",
  props: {
    type: Number,
  },
  data() {
    return {
      user: this.store.state.USER,
      rules: {
        required: (v) => !!v || "Required",
      },
    };
  },
};
</script>
