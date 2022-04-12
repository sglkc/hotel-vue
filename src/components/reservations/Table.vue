<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>ID</th>
          <th>Room Name</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody v-if="filtered.length">
        <tr v-for="(data, i) in filtered" :key="i">
          <td>{{ data.id }}</td>
          <td>{{ data.room_name }}</td>
          <td>{{ data.user_name }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
          <td>{{ new Date(data.checkin).toLocaleDateString() }}</td>
          <td>{{ new Date(data.checkout).toLocaleDateString() }}</td>
          <td>{{ new Date(data.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
      <tbody v-else-if="filtered">
        <tr>
          <td class="text-center font-weight-bold" colspan="8">
            <v-icon color="red">mdi-exclamation-thick</v-icon>
            <span class="text-red">Reservation data is empty</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="8">
            <v-icon class="mdi-spin">mdi-loading</v-icon>
            Loading reservation data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationsTable",
  data() {
    return {
      entries: [],
      filter: null,
      date: null,
    };
  },
  computed: {
    filtered() {
      if (!this.filter && !this.date) return this.entries;
      return this.entries.filter((e) => {
        const string = `${e.user_name}${e.email}${e.phone}`;
        const date = new Date(e.checkin).toLocaleDateString();

        if (!this.date) return string.includes(this.filter);
        return (
          string.includes(this.filter) &&
          date === this.date.toLocaleDateString()
        );
      });
    },
  },
  methods: {
    filterTable(filter) {
      this.filter = filter.filter;
      this.date = filter.date;
    },
    getData() {
      axios
        .get(import.meta.env.VITE_API + "/services/reservations", {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then((res) => {
          this.entries = res.data.result;
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  created() {
    this.emitter.on("filterTable", this.filterTable);
    this.emitter.on("getData", this.getData);
    this.getData();
  },
};
</script>
