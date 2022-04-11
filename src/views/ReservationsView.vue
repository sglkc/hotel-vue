<template>
  <v-container class="my-3 elevation-1">
    <v-row>
      <v-col>
        <h3 class="mb-3">Reservations made by users</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="filter"
          label="Search by name, email, or phone"
          density="comfortable"
          variant="underlined"
          @update:modelValue="filterTable"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col>
        <Datepicker
          v-model="date"
          placeholder="Filter by date"
          :enableTimePicker="false"
          @update:modelValue="filterTable"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Table />
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
import Table from "@/components/reservations/Table.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "ReservationsView",
  components: {
    Table,
    Datepicker,
  },
  data() {
    return {
      filter: "",
      date: "",
    };
  },
  methods: {
    filterTable() {
      const date = this.date ? this.date.toLocaleDateString() : "";
      let filter = this.filter;

      if (date) filter = filter + "DATE:" + date;
      else if (!filter && !date) filter = null;

      console.log(filter);

      this.emitter.emit("filterTable", filter);
    },
  },
};
</script>
