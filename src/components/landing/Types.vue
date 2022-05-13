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
          <v-hover v-slot="{ isHovering, props }">
            <v-img
              v-bind="props"
              height="280"
              :class="isHovering ? 'elevation-6' : 'elevation-0'"
              :src="type.image || notfound"
              cover
              eager
            ></v-img>
          </v-hover>
        </v-col>
        <v-col cols="10" sm="8" md="6" :order="issm ? 5 : 0">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" :elevation="isHovering ? 6 : 1">
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
          </v-hover>
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
import notfound from "@/assets/notfound.png";

export default {
  name: "Types",
  data() {
    return {
      notfound,
      types: [
        {
          id: 1,
          name: "Regular",
          description:
            "Just wanted to have a leisure? This room is perfect for you and your wallet.",
          image:
            "https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg",
          price: 160000,
          total: 15,
          facilities: [
            {
              id: 1,
              room_type: 1,
              name: "Double Bed",
              notes: "Includes pillows and a blanket",
            },
            {
              id: 2,
              room_type: 1,
              name: "Work Desk",
              notes: "Includes a mirror and a table lamp",
            },
            {
              id: 3,
              room_type: 1,
              name: "Air Conditioning",
              notes: "Complete with remote control",
            },
            {
              id: 4,
              room_type: 1,
              name: "Bathroom",
              notes: "A compact bathroom for everyday use",
            },
          ],
        },
        {
          id: 2,
          name: "Exclusive",
          description:
            "Get more comfortable with a living room and a balcony with the city view.",
          image:
            "https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg",
          price: 500000,
          total: 10,
          facilities: [
            {
              id: 5,
              room_type: 2,
              name: "Queen Bed",
              notes:
                "Includes pillows, a blanket, and a cupboard with bed lamp",
            },
            {
              id: 6,
              room_type: 2,
              name: "Air Conditioning",
              notes: "Complete with remote control",
            },
            {
              id: 7,
              room_type: 2,
              name: "Living Room",
              notes: "Includes a table, sofa, and a comfy rug",
            },
            {
              id: 8,
              room_type: 2,
              name: "Balcony",
              notes: "With city view to accompany you",
            },
            {
              id: 9,
              room_type: 2,
              name: "Bathroom",
              notes: "Features a bathtub and a shower",
            },
          ],
        },
        {
          id: 3,
          name: "Premium",
          description:
            "Feel like home, complete with a living room, a dining room, and a fully equipped kitchen.",
          image:
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q60",
          price: 1290000,
          total: 5,
          facilities: [
            {
              id: 10,
              room_type: 3,
              name: "King Bed",
              notes:
                "Includes pillows, a blanket, and a cupboard with bed lamp",
            },
            {
              id: 11,
              room_type: 3,
              name: "Air Conditioning",
              notes: "Complete with remote control",
            },
            {
              id: 12,
              room_type: 3,
              name: "Living Room",
              notes: "Includes a table, sofa, a TV, and a DVD player",
            },
            {
              id: 13,
              room_type: 3,
              name: "Kitchen",
              notes: "Free fresh vegetables daily and stainless silverwares",
            },
            {
              id: 14,
              room_type: 3,
              name: "Dining Room",
              notes: "Imported wooden table with comfortable chairs",
            },
            {
              id: 15,
              room_type: 3,
              name: "Bathroom",
              notes: "Spacious bathroom with a bathtub and a shower",
            },
          ],
        },
      ],
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
};
</script>
