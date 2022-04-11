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
          <th>Notes</th>
          <th>Created At</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody v-if="filtered.length">
        <tr
          v-for="(data, i) in filtered"
          :style="data.id === selected ? 'background: #EEE' : ''"
          :key="i"
        >
          <td>{{ data.id }}</td>
          <td>{{ data.room_name }}</td>
          <td>{{ data.user_name }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
          <td>{{ data.notes }}</td>
          <td>{{ new Date(data.created_at).toLocaleString() }}</td>
          <td class="text-center">
            <v-btn
              class="ma-1"
              color="error"
              size="small"
              variant="contained-text"
              @click="deleteData(data.id)"
            >
              Delete
            </v-btn>
          </td>
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
      selected: false,
      filter: "",
    };
  },
  computed: {
    filtered() {
      if (!this.filter) return this.entries;
      return this.entries.filter((e) => {
        const date = new Date(e.created_at).toLocaleString();
        const string = `
          ${e.user_name}${e.email}${e.phone}
          ${this.filter.includes("DATE:") ? date : ""}
          `;
        const sanitized = this.filter
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          .replace("DATE:", ".*");
        return string.match(new RegExp(`.*${sanitized}.*`, "i"));
      });
    },
  },
  methods: {
    filterTable(filter) {
      this.filter = filter;
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
    updateData(data) {
      this.selected = data.id;
      this.emitter.emit("updateData", data);
    },
    deleteData(id) {
      axios
        .delete(import.meta.env.VITE_API + "/services/rooms/" + id, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          if (this.selected === id) this.emitter.emit("updateData", false);
          this.getData();
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
