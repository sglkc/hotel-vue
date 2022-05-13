<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <v-alert density="compact" type="warning" variant="contained-text">
            Updating room {{ room.id }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row class="mt-3" justify="center">
        <v-col cols="7" md="6">
          <v-text-field
            v-model="name"
            label="Name*"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="5" md="2">
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
        <v-col cols="8" md="3">
          <v-text-field
            label="Room Type*"
            prepend-icon="mdi-bed-king"
            variant="underlined"
            :model-value="room.type_name"
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
  name: "RoomUpdateForm",
  props: {
    room: Object,
  },
  data() {
    return {
      name: this.room.name,
      capacity: this.room.capacity,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    updateRoom(room) {
      this.name = room.name;
      this.capacity = room.capacity;
    },
    async submit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;
    },
    cancel() {
      this.emitter.emit("updateRoom", false);
    },
  },
  created() {
    this.emitter.on("updateRoom", this.updateRoom);
  },
};
</script>
