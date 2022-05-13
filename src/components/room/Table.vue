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
export default {
  name: "RoomTable",
  data() {
    return {
      rooms: [
        {
          type_name: "Regular",
          price: 160000,
          id: 1,
          name: "x30-04",
          room_type: 1,
          capacity: 2,
          created_at: "2022-03-09T22:23:35.000Z",
        },
        {
          type_name: "Regular",
          price: 160000,
          id: 2,
          name: "x30-05",
          room_type: 1,
          capacity: 1,
          created_at: "2022-04-12T07:06:55.000Z",
        },
        {
          type_name: "Regular",
          price: 160000,
          id: 3,
          name: "x30-06",
          room_type: 1,
          capacity: 1,
          created_at: "2022-04-12T07:07:13.000Z",
        },
        {
          type_name: "Exclusive",
          price: 500000,
          id: 4,
          name: "x35-01",
          room_type: 2,
          capacity: 5,
          created_at: "2022-04-12T07:07:37.000Z",
        },
      ],
      selected: false,
    };
  },
  methods: {
    getRooms() {},
    updateRoom(room) {
      this.selected = room.id;
      this.emitter.emit("updateRoom", room);
    },
    deleteRoom(id) {
      if (this.selected === id) this.emitter.emit("updateRoom", false);
    },
  },
  created() {
    this.emitter.on("getRooms", this.getRooms);
    this.getRooms();
  },
};
</script>
