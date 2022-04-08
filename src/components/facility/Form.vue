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
        <v-col cols="12" sm="7">
          <v-text-field
            v-model="notes"
            label="Notes"
            prepend-icon="mdi-note-multiple"
            variant="underlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="">
          <v-text-field
            v-model="image"
            label="Image URL"
            prepend-icon="mdi-image"
            variant="underlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" sm="auto" align="center">
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
  name: "FacilityForm",
  data() {
    return {
      name: null,
      notes: null,
      image: null,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      const body = {
        name: this.name,
        notes: this.notes,
        image: this.image,
      };

      axios
        .post(import.meta.env.VITE_API + "/services/facilities", body, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          this.emitter.emit("getFacilities");
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
};
</script>
