<template>
  <v-container class="h-100 my-3">
    <v-row class="mb-6">
      <v-col class="elevation-1">
        <Table />
      </v-col>
    </v-row>
    <v-row class="elevation-1 mt-3">
      <v-col v-if="!room">
        <Form />
      </v-col>
      <v-col v-else>
        <UpdateForm :room="room" />
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
import Table from "@/components/room/Table.vue";
import Form from "@/components/room/Form.vue";
import UpdateForm from "@/components/room/UpdateForm.vue";

export default {
  name: "RoomsView",
  components: {
    Table,
    Form,
    UpdateForm,
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
