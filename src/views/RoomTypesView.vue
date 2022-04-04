<template>
  <v-container class="h-100 my-3">
    <v-row class="mb-6">
      <v-col class="elevation-1">
        <RoomTypeTable />
      </v-col>
    </v-row>
    <v-row class="elevation-1 mt-3">
      <v-col v-if="!type">
        <RoomTypeForm />
      </v-col>
      <v-col v-else>
        <RoomTypeUpdateForm :type="type" />
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
import RoomTypeTable from "@/components/RoomTypeTable.vue";
import RoomTypeForm from "@/components/RoomTypeForm.vue";
import RoomTypeUpdateForm from "@/components/RoomTypeUpdateForm.vue";

export default {
  name: "RoomTypesView",
  components: {
    RoomTypeTable,
    RoomTypeForm,
    RoomTypeUpdateForm,
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
