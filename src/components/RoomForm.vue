<template>
  <v-form ref="form">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="name"
            label="Name"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="6" md="3">
          <v-text-field
            v-model="roomType"
            label="Room Type"
            prepend-icon="mdi-bed-king"
            variant="underlined"
            :rules="[required]"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            v-model="capacity"
            type="number"
            label="Capacity"
            min="1"
            prepend-icon="mdi-account-multiple"
            variant="underlined"
            :rules="[required]"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" cols="auto">
          <v-btn
            color="primary"
            type="submit"
            variant="outlined"
            @click="sumbit"
          >
            <v-icon>mdi-send</v-icon> Submit
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
      capacity: 1,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    async sumbit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      const body = {
        name: this.name,
        room_type: this.roomType,
        capacity: this.capacity,
      };

      axios
        .post(import.meta.env.VITE_API + "/services/rooms", body)
        .then(() => {
          this.emitter.emit("getRooms");
        })
        .catch(console.error);
    },
  },
};
</script>
