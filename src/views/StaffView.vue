<template>
  <div v-if="loggedIn === null"></div>
  <v-container v-else-if="loggedIn" class="h-100">
    <v-row class="mt-auto mb-0">
      <v-col class="mb-0 pb-0">
        <v-alert type="success">Successfully logged in</v-alert>
      </v-col>
    </v-row>
    <v-row class="mt-auto mb-6">
      <v-col>
        <v-alert type="error" prominent>
          <h1>Staff CRUD Operations currently unavailable</h1>
        </v-alert>
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
        <AuthForm :message="message" />
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

export default {
  name: "StaffView",
  components: {
    AuthForm,
  },
  data() {
    return {
      loggedIn: null,
      message: "",
    };
  },
  methods: {
    logout() {
      window.localStorage.clear();
      location.reload();
    },
    verifyStaff() {
      const role = this.store.state.USER.role_name;
      if (role !== "admin" && role !== "receptionist") {
        this.message = "Your account is unauthorized";
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    },
  },
  async created() {
    this.emitter.on("refreshView", this.verifyStaff);
    if (!this.store.state.JWT_TOKEN) return (this.loggedIn = false);
    this.verifyStaff();
  },
};
</script>
