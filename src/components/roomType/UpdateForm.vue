<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <v-alert density="compact" type="warning" variant="contained-text">
            Updating room type {{ type.id }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="name"
            label="Name*"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            v-model="price"
            type="number"
            label="Price*"
            min="0"
            prepend-icon="mdi-cash-multiple"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            v-model="total"
            type="number"
            label="Rooms*"
            min="1"
            prepend-icon="mdi-bed"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="">
          <v-text-field
            v-model="description"
            label="Description"
            prepend-icon="mdi-note"
            variant="underlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" md="auto" align="center">
          <v-btn
            class="ma-1"
            color="primary"
            type="submit"
            variant="outlined"
            @click="submit"
          >
            <v-icon>mdi-update</v-icon> Update
          </v-btn>
          <v-btn class="ma-1" color="error" variant="outlined" @click="cancel">
            <v-icon>mdi-keyboard-backspace</v-icon> Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "RoomTypeUpdateForm",
  props: {
    type: Object,
  },
  data() {
    return {
      name: this.type.name,
      description: this.type.description,
      price: this.type.price,
      total: this.type.total,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    updateRoomType(type) {
      this.name = type.name;
      this.name = type.name;
      this.description = type.description;
      this.price = type.price;
      this.total = type.total;
    },
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      axios
        .put(
          import.meta.env.VITE_API + "/services/room-types/" + this.type.id,
          {
            name: this.name,
            description: this.description,
            price: this.price,
            total: this.total,
          },
          {
            headers: {
              Authorization: "bearer " + this.store.state.JWT_TOKEN,
            },
          }
        )
        .then(() => {
          this.emitter.emit("getRoomTypes");
          this.cancel();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
    cancel() {
      this.emitter.emit("updateRoomType", false);
    },
  },
  created() {
    this.emitter.on("updateRoomType", this.updateRoomType);
  },
};
</script>
