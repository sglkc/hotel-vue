<template>
  <div id="types">
    <v-container class="h-100vh py-12">
      <v-row>
        <v-col class="px-4 px-sm-15 mx-4 mx-sm-15" align="center">
          <h1>Room Types</h1>
          <div>
            We've got different room types adjusted to your budget and needs.
          </div>
          <div>
            Are you traveling for business or leisure? Looking for a single room
            or a family room?
          </div>
          <div class="font-italic">We can always accommodate you.</div>
        </v-col>
      </v-row>
      <v-row
        v-for="(type, i) in types"
        class="mt-6 h-100"
        align="center"
        data-aos-anchor-placement="center-bottom"
        justify="center"
        :data-aos="i % 2 ? 'fade-left' : 'fade-right'"
        :key="i"
      >
        <v-col class="pa-0 h-100" :order="i % 2">
          <v-img height="320" :src="type.image || notfound" eager></v-img>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>
              <h3>{{ type.name }}</h3>
            </v-card-title>
            <v-card-subtitle class="d-block">
              <h3 class="font-weight-regular">{{ type.description }}</h3>
              <v-divider class="my-3"></v-divider>
              <v-container class="details">
                <v-row>
                  <v-col>Total Facilities</v-col>
                  <v-col>Total Rooms</v-col>
                </v-row>
                <v-row>
                  <v-col>{{ type.facilities.length }}</v-col>
                  <v-col>{{ type.total }}</v-col>
                </v-row>
              </v-container>
            </v-card-subtitle>
            <v-card-text class="py-2 text-high-emphasis">
              <v-alert
                border="start"
                color="blue"
                density="comfortable"
                variant="contained-text"
              >
                <v-icon class="me-2">mdi-cash-multiple</v-icon>
                Only for <b>Rp.{{ type.price }}</b>
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="outlined" @click="toggle(i)">
                <v-icon class="me-2">mdi-lamp</v-icon> Room Facilities
              </v-btn>
              <v-btn color="primary">
                <v-icon class="me-2">mdi-tag-plus</v-icon> Reserve Now!
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="reveal[i]">
                <v-divider></v-divider>
                <v-list class="mb-2" density="compact">
                  <v-list-item
                    v-for="(facility, j) in type.facilities"
                    min-height="28"
                    :key="j"
                  >
                    <v-list-item-title class="me-5">
                      {{ facility.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ facility.notes }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.details .v-row .v-col {
  padding: 0.5em;
}
</style>

<script>
import axios from "axios";
import notfound from "@/assets/notfound.png";

export default {
  name: "Types",
  data() {
    return {
      notfound,
      types: [],
      reveal: [],
    };
  },
  methods: {
    toggle(id) {
      this.reveal[id] = !this.reveal[id];
    },
  },
  created() {
    axios
      .get(import.meta.env.VITE_API + "/services/room-types")
      .then((res) => {
        res.data.result.forEach((r) => {
          axios
            .get(
              import.meta.env.VITE_API +
                "/services/room-types/" +
                r.id +
                "/facilities"
            )
            .then((res) => {
              r.facilities = res.data.result;
              this.types.push(r);
            })
            .catch(console.error);
        });
      })
      .catch(console.error);
  },
};
</script>
