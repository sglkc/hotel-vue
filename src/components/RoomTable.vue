<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th>Room Type</th>
          <th>Room Type ID</th>
          <th>Name</th>
          <th>Max Capacity</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody v-if="rooms">
        <tr v-for="(room, i) in rooms" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ room.id }}</td>
          <td>{{ room.type_name }}</td>
          <td>{{ room.room_type }}</td>
          <td>{{ room.name }}</td>
          <td>{{ room.capacity }}</td>
          <td>{{ new Date(room.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="7">
            <v-icon class="mdi-spin" size="">mdi-loading</v-icon> Loading data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomTable",
  data() {
    return {
      rooms: false,
    };
  },
  methods: {
    async getRooms() {
      const res = await axios.get(import.meta.env.VITE_API + "/services/rooms");
      this.rooms = res.data.result;
    },
  },
  async mounted() {
    this.emitter.on("getRooms", this.getRooms);
    this.getRooms();
  },
};
</script>
