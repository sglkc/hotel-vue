<template>
  <v-container class="h-100 my-3">
    <v-row class="mb-6">
      <v-col class="elevation-1">
        <Table />
      </v-col>
    </v-row>
    <v-row class="elevation-1 mt-3">
      <v-col v-if="!type">
        <Form />
      </v-col>
      <v-col v-else>
        <UpdateForm :type="type" />
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
import Table from "@/components/roomType/Table.vue";
import Form from "@/components/roomType/Form.vue";
import UpdateForm from "@/components/roomType/UpdateForm.vue";

export default {
  name: "RoomTypesView",
  components: {
    Table,
    Form,
    UpdateForm,
  },
  data() {
    return {
      type: false,
    };
  },
  methods: {
    updateRoomType(type) {
      this.type = type;
    },
  },
  created() {
    this.emitter.on("updateRoomType", this.updateRoomType);
  },
};
</script>
