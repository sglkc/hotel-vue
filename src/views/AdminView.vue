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
  <v-container v-else style="height: 100%" fluid>
    <v-row style="height: 100%" align="center" justify="center">
      <v-col cols="10" md="4" sm="8">
        <AuthForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import KamarTable from "@/components/KamarTable.vue";
import KamarForm from "@/components/KamarForm.vue";
import AuthForm from "@/components/AuthForm.vue";

export default {
  name: "AdminView",
  components: {
    KamarTable,
    KamarForm,
    AuthForm,
  },
  data() {
    return {
      loggedIn: this.store.state.JWT.expire > Date.now(),
    };
  },
  methods: {
    refreshLoggedIn() {
      this.loggedIn = this.store.state.JWT.expire > Date.now();
    },
  },
  async mounted() {
    this.emitter.on("refreshAdminView", this.refreshLoggedIn);
  },
};
</script>
