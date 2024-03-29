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
import axios from "axios";
import notfound from "@/assets/notfound.png";

export default {
  name: "FacilityTable",
  data() {
    return {
      notfound,
      facilities: false,
      selected: false,
    };
  },
  methods: {
    getFacilities() {
      axios
        .get(import.meta.env.VITE_API + "/services/facilities", {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then((res) => {
          this.facilities = res.data.result;
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
    updateFacility(facility) {
      this.selected = facility.id;
      this.emitter.emit("updateFacility", facility);
    },
    deleteFacility(id) {
      axios
        .delete(import.meta.env.VITE_API + "/services/facilities/" + id, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          if (this.selected === id) this.emitter.emit("updateFacility", false);
          this.getFacilities();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  created() {
    this.emitter.on("getFacilities", this.getFacilities);
    this.getFacilities();
  },
};
</script>
