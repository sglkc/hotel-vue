<template>
  <v-container class="h-100 my-3">
    <v-row class="mb-6">
      <v-col class="elevation-1">
        <FacilityTable />
      </v-col>
    </v-row>
    <v-row class="elevation-1 mt-3">
      <v-col v-if="!facility">
        <FacilityForm />
      </v-col>
      <v-col v-else>
        <FacilityUpdateForm :facility="facility" />
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
import FacilityTable from "@/components/FacilityTable.vue";
import FacilityForm from "@/components/FacilityForm.vue";
import FacilityUpdateForm from "@/components/FacilityUpdateForm.vue";

export default {
  name: "FacilitiesView",
  components: {
    FacilityTable,
    FacilityForm,
    FacilityUpdateForm,
  },
  data() {
    return {
      facility: false,
    };
  },
  methods: {
    updateFacility(facility) {
      this.facility = facility;
    },
  },
  created() {
    this.emitter.on("updateFacility", this.updateFacility);
  },
};
</script>
