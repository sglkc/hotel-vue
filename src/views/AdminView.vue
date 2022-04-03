<template>
  <v-container v-if="loggedIn" class="h-100">
    <v-row class="mt-auto mb-6">
      <v-col class="elevation-1">
        <RoomTable />
      </v-col>
    </v-row>
    <v-row class="elevation-1">
      <v-col>
        <RoomForm class="mt-3" />
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
