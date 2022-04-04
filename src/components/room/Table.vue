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
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody v-if="rooms.length">
        <tr
          v-for="(room, i) in rooms"
          :style="room.id === selected ? 'background: #EEE' : ''"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ room.id }}</td>
          <td>{{ room.type_name }}</td>
          <td>{{ room.room_type }}</td>
          <td>{{ room.name }}</td>
          <td>{{ room.capacity }}</td>
          <td>{{ new Date(room.created_at).toLocaleString() }}</td>
          <td class="text-center">
            <v-btn
              class="ma-1"
              color="error"
              size="small"
              variant="contained-text"
              @click="deleteRoom(room.id)"
            >
              Delete
            </v-btn>
            <v-btn
              class="ma-1"
              color="warning"
              size="small"
              variant="contained-text"
              @click="updateRoom(room)"
            >
              Update
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="rooms">
        <tr>
          <td class="text-center font-weight-bold" colspan="8">
            <v-icon color="red">mdi-exclamation-thick</v-icon>
            <span class="text-red">Room data is empty</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="8">
            <v-icon class="mdi-spin">mdi-loading</v-icon> Loading room data
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
      selected: false,
    };
  },
  methods: {
    async getRooms() {
      const res = await axios.get(import.meta.env.VITE_API + "/services/rooms");
      this.rooms = res.data.result;
    },
    updateRoom(room) {
      this.selected = room.id;
      this.emitter.emit("updateRoom", room);
    },
    async deleteRoom(id) {
      axios
        .delete(import.meta.env.VITE_API + "/services/rooms/" + id, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          if (this.selected === id) this.emitter.emit("updateRoom", false);
          this.getRooms();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  created() {
    this.emitter.on("getRooms", this.getRooms);
    this.getRooms();
  },
};
</script>
