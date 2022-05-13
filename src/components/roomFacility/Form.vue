<template>
  <v-form ref="form">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="4" md="3">
          <v-text-field
            v-model="name"
            label="Name*"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" md="4">
          <v-text-field
            v-model="notes"
            label="Notes"
            prepend-icon="mdi-note"
            variant="underlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-3">
          <div :style="'color: ' + (roomType ? '#00000099' : '#b00020')">
            <v-icon>mdi-bed-king</v-icon>
            <span class="ms-3">Room Type*</span>
          </div>
          <v-radio-group
            v-if="roomTypes"
            v-model="roomType"
            class="mt-1"
            hide-details
            mandatory
          >
            <span v-if="roomTypes.length">
              <v-radio
                v-for="type in roomTypes"
                :key="type.id"
                :label="type.name"
                :value="type.id"
              ></v-radio>
            </span>
            <div v-else class="mt-3">
              <v-icon color="red">mdi-exclamation-thick</v-icon>
              <span class="text-red">Room type is empty</span>
            </div>
          </v-radio-group>
          <div v-else class="mt-3">
            <v-icon class="mdi-spin">mdi-loading</v-icon> Loading room types
          </div>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" align="center">
          <v-btn
            color="primary"
            type="submit"
            variant="outlined"
            @click="submit"
          >
            <v-icon>mdi-plus</v-icon> New
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "RoomForm",
  data() {
    return {
      name: null,
      roomType: null,
      roomTypes: [
        {
          id: 1,
          name: "Regular",
          description:
            "Just wanted to have a leisure? This room is perfect for you and your wallet.",
          image:
            "https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg",
          price: 160000,
          total: 15,
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
        },
      ],
      notes: null,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;
      if (!this.roomType) return;
    },
  },
};
</script>
