<template>
  <v-form ref="form">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="name"
            label="Name*"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="" md="2">
          <v-text-field
            v-model="capacity"
            type="number"
            label="Capacity*"
            min="1"
            prepend-icon="mdi-account-multiple"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-3" cols="12" sm="">
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
import axios from "axios";

export default {
  name: "RoomForm",
  data() {
    return {
      name: "",
      roomType: "",
      roomTypes: false,
      capacity: 1,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;
      if (!this.roomType) return;

      const body = {
        name: this.name,
        room_type: this.roomType,
        capacity: this.capacity,
      };

      axios
        .post(import.meta.env.VITE_API + "/services/rooms", body, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          this.emitter.emit("getRooms");
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  async created() {
    axios
      .get(import.meta.env.VITE_API + "/services/room-types")
      .then((res) => {
        this.roomTypes = res.data.result;
      })
      .catch((err) => {
        console.error(err.response?.data.error ?? err);
      });
  },
};
</script>
