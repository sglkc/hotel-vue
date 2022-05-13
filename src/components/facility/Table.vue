<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th>Name</th>
          <th>Notes</th>
          <th>Image</th>
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
          <td>{{ facility.name }}</td>
          <td>{{ facility.notes ?? "-" }}</td>
          <td>
            <v-btn class="pa-0" variant="text">
              <v-img transition="false" :src="facility.image || notfound">
              </v-img>
              <v-dialog activator="parent">
                <v-card>
                  <v-img
                    width="450"
                    :src="facility.image || notfound"
                    cover
                  ></v-img>
                </v-card>
              </v-dialog>
            </v-btn>
          </td>
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
          <td class="text-center font-weight-bold" colspan="6">
            <v-icon color="red">mdi-exclamation-thick</v-icon>
            <span class="text-red">Facility data is empty</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="6">
            <v-icon class="mdi-spin">mdi-loading</v-icon> Loading facility data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import notfound from "@/assets/notfound.png";

export default {
  name: "FacilityTable",
  data() {
    return {
      notfound,
      facilities: [
        {
          id: 1,
          name: "Restroom",
          notes: "Hygienic restroom can be used by the public.",
          image:
            "https://images.unsplash.com/photo-1569597967185-cd6120712154?ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
        },
        {
          id: 2,
          name: "Wi-Fi Network",
          notes: "Free, with 5Mbps speed. Reachable across the whole hotel.",
          image:
            "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?ixlib=rb-1.2.1&auto=format&fit=crop&w=1173&q=60",
        },
        {
          id: 3,
          name: "Restaurant",
          notes:
            "Healthy and high-quality food brought to you by professional chefs.",
          image:
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=60",
        },
        {
          id: 4,
          name: "Cleaning Service",
          notes:
            "We clean every single place everyday, leaving the hotel without dirt.",
          image:
            "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=60",
        },
        {
          id: 5,
          name: "Swimming Pool",
          notes: "Refresh your days in the pool.",
          image:
            "https://images.unsplash.com/photo-1512470289403-f3639ce9ae09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1117&q=60",
        },
      ],
      selected: false,
    };
  },
  methods: {
    getFacilities() {},
    updateFacility(facility) {
      this.selected = facility.id;
      this.emitter.emit("updateFacility", facility);
    },
    deleteFacility(id) {
      if (this.selected === id) this.emitter.emit("updateFacility", false);
    },
  },
  created() {
    this.emitter.on("getFacilities", this.getFacilities);
    this.getFacilities();
  },
};
</script>
