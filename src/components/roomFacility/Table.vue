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
          <td class="text-center font-weight-bold" colspan="7">
            <v-icon color="red">mdi-exclamation-thick</v-icon>
            <span class="text-red">Facility data is empty</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="7">
            <v-icon class="mdi-spin">mdi-loading</v-icon> Loading facility data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
export default {
  name: "RoomFacilityTable",
  data() {
    return {
      facilities: [
        {
          type_name: "Regular",
          id: 1,
          room_type: 1,
          name: "Double Bed",
          notes: "Includes pillows and a blanket",
        },
        {
          type_name: "Regular",
          id: 2,
          room_type: 1,
          name: "Work Desk",
          notes: "Includes a mirror and a table lamp",
        },
        {
          type_name: "Regular",
          id: 3,
          room_type: 1,
          name: "Air Conditioning",
          notes: "Complete with remote control",
        },
        {
          type_name: "Regular",
          id: 4,
          room_type: 1,
          name: "Bathroom",
          notes: "A compact bathroom for everyday use",
        },
        {
          type_name: "Exclusive",
          id: 5,
          room_type: 2,
          name: "Queen Bed",
          notes: "Includes pillows, a blanket, and a cupboard with bed lamp",
        },
        {
          type_name: "Exclusive",
          id: 6,
          room_type: 2,
          name: "Air Conditioning",
          notes: "Complete with remote control",
        },
        {
          type_name: "Exclusive",
          id: 7,
          room_type: 2,
          name: "Living Room",
          notes: "Includes a table, sofa, and a comfy rug",
        },
        {
          type_name: "Exclusive",
          id: 8,
          room_type: 2,
          name: "Balcony",
          notes: "With city view to accompany you",
        },
        {
          type_name: "Exclusive",
          id: 9,
          room_type: 2,
          name: "Bathroom",
          notes: "Features a bathtub and a shower",
        },
        {
          type_name: "Premium",
          id: 10,
          room_type: 3,
          name: "King Bed",
          notes: "Includes pillows, a blanket, and a cupboard with bed lamp",
        },
        {
          type_name: "Premium",
          id: 11,
          room_type: 3,
          name: "Air Conditioning",
          notes: "Complete with remote control",
        },
        {
          type_name: "Premium",
          id: 12,
          room_type: 3,
          name: "Living Room",
          notes: "Includes a table, sofa, a TV, and a DVD player",
        },
        {
          type_name: "Premium",
          id: 13,
          room_type: 3,
          name: "Kitchen",
          notes: "Free fresh vegetables daily and stainless silverwares",
        },
        {
          type_name: "Premium",
          id: 14,
          room_type: 3,
          name: "Dining Room",
          notes: "Imported wooden table with comfortable chairs",
        },
        {
          type_name: "Premium",
          id: 15,
          room_type: 3,
          name: "Bathroom",
          notes: "Spacious bathroom with a bathtub and a shower",
        },
      ],
      selected: false,
    };
  },
  methods: {
    getRoomFacilities() {},
    updateFacility(facility) {
      this.selected = facility.id;
      this.emitter.emit("updateRoomFacility", facility);
    },
    deleteFacility(id) {
      if (this.selected === id) this.emitter.emit("updateRoomFacility", false);
    },
  },
  created() {
    this.emitter.on("getRoomFacilities", this.getRoomFacilities);
    this.getRoomFacilities();
  },
};
</script>
