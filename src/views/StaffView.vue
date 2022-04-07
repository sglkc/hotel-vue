<template>
  <div v-if="loggedIn === null"></div>
  <v-container v-else-if="loggedIn" class="h-100">
    <v-row class="mt-auto mb-6">
      <v-col>
        <v-alert type="success">Successfully logged in</v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="elevation-1">
        <h1 class="pa-3">Welcome, {{ store.state.USER.full_name }}</h1>
        <v-list density="compact">
          <v-list-item>Email: {{ store.state.USER.email }}</v-list-item>
          <v-list-item>Role: {{ store.state.USER.role_name }}</v-list-item>
          <v-list-item>
            <b>Use the sidebar to get started</b>
          </v-list-item>
          <v-list-item>
            <v-btn color="error" variant="outlined" @click="logout">
              <v-icon>mdi-logout</v-icon> Logout
            </v-btn>
          </v-list-item>
        </v-list>
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
  name: "StaffView",
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
    logout() {
      window.localStorage.clear();
      location.reload();
    },
  },
  async created() {
    this.emitter.on("refreshStaffView", this.refreshLoggedIn);

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
