<template>
  <v-container class="h-100 my-3">
    <v-row class="mb-6">
      <v-col class="elevation-1">
        <RoomTable />
      </v-col>
    </v-row>
    <v-row class="elevation-1 mt-3">
      <v-col v-if="!room">
        <RoomForm />
      </v-col>
      <v-col v-else>
        <RoomUpdateForm :room="room" />
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
import RoomUpdateForm from "@/components/RoomUpdateForm.vue";

export default {
  name: "RoomsView",
  components: {
    RoomTable,
    RoomForm,
    RoomUpdateForm,
  },
  data() {
    return {
      room: false,
    };
  },
  methods: {
    updateRoom(room) {
      this.room = room;
    },
  },
  created() {
    this.emitter.on("updateRoom", this.updateRoom);
  },
};
</script>
