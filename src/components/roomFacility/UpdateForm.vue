<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <v-alert density="compact" type="warning" variant="contained-text">
            Updating room facility {{ facility.id }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-3" justify="center">
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="name"
            label="Name*"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="notes"
            label="Notes"
            prepend-icon="mdi-note"
            variant="underlined"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            label="Room Type*"
            prepend-icon="mdi-bed-king"
            variant="underlined"
            :model-value="facility.type_name"
            disabled
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" align="center">
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
export default {
  name: "RoomFacilityUpdateForm",
  props: {
    facility: Object,
  },
  data() {
    return {
      name: this.facility.name,
      notes: this.facility.notes,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    updateRoomFacility(facility) {
      this.name = facility.name;
      this.notes = facility.notes;
    },
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;
    },
    cancel() {
      this.emitter.emit("updateRoomFacility", false);
    },
  },
  created() {
    this.emitter.on("updateRoomFacility", this.updateRoomFacility);
  },
};
</script>
