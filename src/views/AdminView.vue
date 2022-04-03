<template>
  <div v-if="loggedIn === null"></div>
  <v-container v-else-if="loggedIn" class="h-100">
    <v-row class="mt-auto mb-6">
      <v-col>
        <v-alert type="success">Successfully logged in</v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>abc</v-card-title>
          <v-card-text>ROle: {{ store.state.USER.role_name }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="h-100" fluid>
    <v-row class="h-100" align="center" justify="center">
      <v-col cols="auto" md="5" lg="4">
        <AuthForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.h-100 {
  height: 100%;
}
</style>

<script>
import AuthForm from "@/components/AuthForm.vue";
import axios from "axios";

export default {
  name: "AdminView",
  components: {
    AuthForm,
  },
  data() {
    return {
      loggedIn: null,
    };
  },
  methods: {
    refreshLoggedIn(e) {
      this.loggedIn = e;
    },
  },
  async created() {
    this.emitter.on("refreshAdminView", this.refreshLoggedIn);
    axios
      .post(import.meta.env.VITE_API + "/auth/verify", {
        token: this.store.state.JWT.token,
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
