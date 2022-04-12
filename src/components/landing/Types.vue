<template>
  <section id="types">
    <v-container class="h-100vh py-16">
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
        class="mt-15 h-100"
        align="center"
        data-aos-anchor-placement="center-bottom"
        data-aos-once="true"
        justify="center"
        :data-aos="i % 2 ? 'fade-left' : 'fade-right'"
        :key="i"
      >
        <v-col class="pa-0 h-100" cols="12" md="6" :order="i % 2">
          <v-img height="320" :src="type.image || notfound" eager></v-img>
        </v-col>
        <v-col cols="10" sm="8" md="6" :order="issm ? 5 : 0">
          <v-card>
            <v-card-title class="text-h6">{{ type.name }}</v-card-title>
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
              <v-btn color="primary" @click="selectType(type)">
                <v-icon class="me-2">mdi-calendar-plus</v-icon> Reserve Now!
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <v-container
                v-show="reveal[i]"
                class="text-body-2 text-medium-emphasis"
              >
                <v-divider class="mb-3"></v-divider>
                <v-row v-for="(facility, j) in type.facilities" :key="j">
                  <v-col class="d-flex flex-column justify-center" cols="4">
                    <span>{{ facility.name }}</span>
                  </v-col>
                  <v-col>{{ facility.notes }}</v-col>
                </v-row>
              </v-container>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
#types {
  background: conic-gradient(from 45deg at bottom left, #a5c9ff, white);
}

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
  computed: {
    issm() {
      return this.$vuetify.display.xs || this.$vuetify.display.sm;
    },
  },
  methods: {
    toggle(id) {
      this.reveal[id] = !this.reveal[id];
    },
    selectType(type) {
      this.emitter.emit("selectType", type);
      this.$router.push("#reservation");
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
