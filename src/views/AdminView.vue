<template>
  <v-container v-if="loggedIn">
    <v-row elevation="12">
      <v-col class="elevation-1 mb-6">
        <KamarTable />
      </v-col>
    </v-row>
    <v-row class="elevation-1">
      <v-col>
        <KamarForm class="mt-3" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="mt-10">
    <v-row justify="center">
      <v-col cols="10" md="5" sm="8">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import KamarTable from "@/components/KamarTable.vue";
import KamarForm from "@/components/KamarForm.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "AdminView",
  components: {
    KamarTable,
    KamarForm,
    LoginForm,
  },
  data() {
    return {
      loggedIn: !!this.store.state.JWT_TOKEN,
    };
  },
  methods: {
    refreshLoggedIn() {
      this.loggedIn = !!this.store.state.JWT_TOKEN;
    },
  },
  async mounted() {
    this.emitter.on("tryLogin", this.refreshLoggedIn);
  },
};
</script>
