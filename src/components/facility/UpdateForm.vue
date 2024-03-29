<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <v-alert density="compact" type="warning" variant="contained-text">
            Updating facility {{ facility.id }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-3" justify="center">
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
  name: "FacilityUpdateForm",
  props: {
    facility: Object,
  },
  data() {
    return {
      name: this.facility.name,
      notes: this.facility.notes,
      image: this.facility.image,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    updateFacility(facility) {
      this.name = facility.name;
      this.notes = facility.notes;
      this.image = facility.image;
    },
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      axios
        .put(
          import.meta.env.VITE_API + "/services/facilities/" + this.facility.id,
          {
            name: this.name,
            notes: this.notes,
            image: this.image,
          },
          {
            headers: {
              Authorization: "bearer " + this.store.state.JWT_TOKEN,
            },
          }
        )
        .then(() => {
          this.emitter.emit("getFacilities");
          this.cancel();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
    cancel() {
      this.emitter.emit("updateFacility", false);
    },
  },
  created() {
    this.emitter.on("updateFacility", this.updateFacility);
  },
};
</script>
