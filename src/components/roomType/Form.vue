<template>
  <v-form ref="form">
    <v-container>
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
        <v-col cols="12" sm="">
          <v-text-field
            v-model="description"
            label="Description"
            prepend-icon="mdi-note"
            variant="underlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" cols="auto" align="center">
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
  name: "RoomTypeForm",
  data() {
    return {
      name: "",
      description: "",
      price: 0,
      total: 1,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      const body = {
        name: this.name,
        description: this.description,
        price: this.price,
        total: this.total,
      };

      axios
        .post(import.meta.env.VITE_API + "/services/room-types", body, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          this.emitter.emit("getRoomTypes");
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
};
</script>
