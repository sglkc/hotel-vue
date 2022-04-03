<template>
  <v-container class="h-100">
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
</template>

<style scoped>
.h-100 {
  height: 100%;
}
</style>

<script>
import RoomTable from "@/components/RoomTable.vue";
import RoomForm from "@/components/RoomForm.vue";

export default {
  name: "RoomView",
  components: {
    RoomTable,
    RoomForm,
  },
};
</script>
