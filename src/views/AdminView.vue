<template>
  <v-container v-if="loggedIn">
    <v-row elevation="12">
      <v-col class="elevation-1 mb-6">
        <RoomTable />
      </v-col>
    </v-row>
    <v-row class="elevation-1">
      <v-col>
        <RoomForm class="mt-3" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else style="height: 100%" fluid>
    <v-row style="height: 100%" align="center" justify="center">
      <v-col cols="auto" md="5" lg="4">
        <AuthForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import RoomTable from "@/components/RoomTable.vue";
import RoomForm from "@/components/RoomForm.vue";
import AuthForm from "@/components/AuthForm.vue";

export default {
  name: "AdminView",
  components: {
    RoomTable,
    RoomForm,
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
