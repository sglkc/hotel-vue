<template>
  <v-container class="h-100 my-3">
    <v-row class="mb-6">
      <v-col class="elevation-1">
        <Table />
      </v-col>
    </v-row>
    <v-row class="elevation-1 mt-3">
      <v-col v-if="!facility">
        <Form />
      </v-col>
      <v-col v-else>
        <UpdateForm :facility="facility" />
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
import Table from "@/components/roomFacility/Table.vue";
import Form from "@/components/roomFacility/Form.vue";
import UpdateForm from "@/components/roomFacility/UpdateForm.vue";

export default {
  name: "RoomFacilitiesView",
  components: {
    Table,
    Form,
    UpdateForm,
  },
  data() {
    return {
      facility: false,
    };
  },
  methods: {
    updateRoomFacility(facility) {
      this.facility = facility;
    },
  },
  created() {
    this.emitter.on("updateRoomFacility", this.updateRoomFacility);
  },
};
</script>
