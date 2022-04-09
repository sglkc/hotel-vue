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
          <th>Notes</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody v-if="facilities.length">
        <tr
          v-for="(facility, i) in facilities"
          :style="facility.id === selected ? 'background: #EEE' : ''"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ facility.id }}</td>
          <td>{{ facility.type_name }}</td>
          <td>{{ facility.room_type }}</td>
          <td>{{ facility.name }}</td>
          <td>{{ facility.notes ?? "-" }}</td>
          <td class="text-center">
            <v-btn
              class="ma-1"
              color="error"
              size="small"
              variant="contained-text"
              @click="deleteFacility(facility.id)"
            >
              Delete
            </v-btn>
            <v-btn
              class="ma-1"
              color="warning"
              size="small"
              variant="contained-text"
              @click="updateFacility(facility)"
            >
              Update
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="facilities">
        <tr>
          <td class="text-center font-weight-bold" colspan="5">
            <v-icon color="red">mdi-exclamation-thick</v-icon>
            <span class="text-red">Facility data is empty</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="5">
            <v-icon class="mdi-spin">mdi-loading</v-icon> Loading facility data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomFacilityTable",
  data() {
    return {
      facilities: false,
      selected: false,
    };
  },
  methods: {
    async getRoomFacilities() {
      const res = await axios.get(
        import.meta.env.VITE_API + "/services/room-facilities"
      );
      this.facilities = res.data.result;
    },
    updateFacility(facility) {
      this.selected = facility.id;
      this.emitter.emit("updateRoomFacility", facility);
    },
    async deleteFacility(id) {
      axios
        .delete(import.meta.env.VITE_API + "/services/room-facilities/" + id, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          if (this.selected === id) {
            this.emitter.emit("updateRoomFacility", false);
          }
          this.getRoomFacilities();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  created() {
    this.emitter.on("getRoomFacilities", this.getRoomFacilities);
    this.getRoomFacilities();
  },
};
</script>
