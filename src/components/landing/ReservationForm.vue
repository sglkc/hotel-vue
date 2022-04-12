<template>
  <v-card class="px-3 px-sm-5 pb-5">
    <v-card-title class="pt-5 px-1 px-sm-5 pb-0 justify-center">
      Make a room reservation
    </v-card-title>
    <v-card-text class="pt-1 px-1 px-sm-5">
      Welcome, {{ user.full_name }} ({{ user.email }})
    </v-card-text>
    <v-form ref="form">
      <v-text-field
        class="mb-4"
        density="comfortable"
        label="Full Name"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        :modelValue="user.full_name"
        disabled
        hide-details
      ></v-text-field>
      <v-text-field
        class="mb-4"
        density="comfortable"
        label="Email Address"
        prepend-inner-icon="mdi-email"
        variant="outlined"
        :modelValue="user.email"
        disabled
        hide-details
      ></v-text-field>
      <v-row class="my-3" justify="center" align="center">
        <v-col class="py-0">
          <v-text-field
            density="comfortable"
            label="Room Type"
            prepend-inner-icon="mdi-bed-king"
            variant="outlined"
            :disabled="!!type.name"
            :modelValue="type.name || 'Please select from above'"
            :readonly="!type.name"
            :rules="[rules.type]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="py-0 ps-0" cols="auto" justify="center">
          <v-btn
            color="primary"
            icon="mdi-chevron-up"
            size="small"
            variant="contained-text"
            @click="scrollToTypes"
          ></v-btn>
        </v-col>
      </v-row>
      <v-row v-if="rooms.length" class="ms-1 mt-3 mb-0">
        <div class="text-medium-emphasis">Select Rooms</div>
      </v-row>
      <v-row v-if="rooms.length" class="mb-0">
        <v-col v-for="(room, i) in rooms" :key="i" align="left" cols="auto">
          <v-checkbox
            v-model="selected_rooms"
            density="compact"
            :error="!selected_rooms.length"
            :label="room.name"
            :value="room.id"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-alert
        v-else-if="!rooms.length && type.name"
        class="mb-4 text-start"
        color="error"
        density="compact"
        variant="outlined"
      >
        <v-icon class="me-1">mdi-close-circle</v-icon>
        No rooms available for type {{ type.name }}.
      </v-alert>
      <v-text-field
        v-model="phone"
        class="mb-4"
        density="comfortable"
        label="Phone Number"
        prepend-inner-icon="mdi-phone"
        variant="outlined"
        :rules="[rules.required, rules.number]"
        hide-details
      ></v-text-field>
      <v-row>
        <v-col class="pe-2">
          <Datepicker
            v-model="checkin"
            inputClassName="py-3"
            placeholder="Checkin"
            :clearable="false"
            :enableTimePicker="false"
            :minDate="new Date()"
            :state="states.checkin"
            disableMonthYearSelect
          >
            <template #input-icon>
              <v-icon class="ms-3">mdi-calendar-clock</v-icon>
            </template>
          </Datepicker>
        </v-col>
        <v-col class="ps-2">
          <Datepicker
            v-model="checkout"
            inputClassName="py-3"
            placeholder="Checkout"
            :clearable="false"
            :enableTimePicker="false"
            :disabled="!checkin"
            :minDate="tomorrow || new Date()"
            :state="states.checkout"
            disableMonthYearSelect
          >
            <template #input-icon>
              <v-icon class="ms-3">mdi-calendar-check</v-icon>
            </template>
          </Datepicker>
        </v-col>
      </v-row>
      <v-expand-transition>
        <v-alert
          v-show="status.length"
          class="text-start mt-4"
          density="compact"
          variant="outlined"
          :color="status[0]"
          :icon="status[1]"
        >
          <span class="font-weight-medium">{{ status[2] }}</span>
        </v-alert>
      </v-expand-transition>
      <v-row class="mt-2">
        <v-col cols="auto">
          <v-btn
            color="red"
            prepend-icon="mdi-logout"
            variant="outlined"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            color="primary"
            prepend-icon="mdi-calendar-plus"
            type="submit"
            @click="submit"
          >
            Reserve
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="reservations.length">
        <v-col class="pb-0">
          <v-btn
            color="primary"
            density="comfortable"
            variant="text"
            @click="toggleForm"
            block
          >
            Open My Reservations
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<style>
.dp__input_icon_pad {
  padding-left: 40px;
}
</style>

<script>
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "ReservationForm",
  components: {
    Datepicker,
  },
  data() {
    return {
      phone: null,
      type: {},
      rooms: [],
      selected_rooms: [],
      checkin: null,
      checkout: null,
      rules: {
        type: (v) => v !== "Please select from above" || "Type not selected",
        required: (v) => !!v || "Required",
        number: (v) => Number.isInteger(Number(v)) || "Must be number",
      },
      states: {
        checkin: null,
        checkout: null,
      },
      status: [],
      reservations: [],
    };
  },
  computed: {
    user() {
      return this.store.state.USER;
    },
    tomorrow() {
      const now = new Date(this.checkin) || new Date();
      return new Date(now.setDate(now.getDate() + 1));
    },
  },
  methods: {
    scrollToTypes() {
      document.getElementById("types").scrollIntoView({ behavior: "smooth" });
      this.$router.push("#types");
    },
    getRooms(id) {
      axios
        .get(import.meta.env.VITE_API + `/services/room-types/${id}/available`)
        .then((res) => {
          this.rooms = res.data.result;
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
    selectType(type) {
      this.type = type;
      this.room = null;
      this.getRooms(type.id);
    },
    logout() {
      window.localStorage.clear();
      this.emitter.emit("refreshView", false);
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = date.getDate();

      return `${year}-${month}-${day}`;
    },
    async submit() {
      const validation = await this.$refs.form.validate();

      this.states.checkin = !this.checkin ? false : null;
      this.states.checkout =
        !this.checkout || this.checkout <= this.checkin ? false : null;
      if (this.states.checkin === false || this.states.checkout === false) {
        return;
      }
      if (!this.selected_rooms.length) return;
      if (!validation.valid) return;

      axios
        .post(
          import.meta.env.VITE_API + "/services/reservations",
          {
            room_type: this.type.id,
            room_id: this.selected_rooms,
            user_id: this.user.id,
            phone: this.phone,
            checkin: this.formatDate(this.checkin),
            checkout: this.formatDate(this.checkout),
          },
          {
            headers: {
              Authorization: "bearer " + this.store.state.JWT_TOKEN,
            },
          }
        )
        .then(() => {
          this.getRooms();
          this.status = [
            "success",
            "mdi-bookmark-check",
            "Success reserving room!",
          ];
        })
        .catch((err) => {
          this.status = [
            "error",
            "mdi-close-circle",
            err.response?.data.error ?? err.toString(),
          ];
        });
    },
    toggleForm() {
      this.emitter.emit("toggleForm", false);
    },
  },
  created() {
    this.emitter.on("selectType", this.selectType);

    axios
      .get(
        import.meta.env.VITE_API +
          `/services/users/${this.user.id}/reservations`,
        {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        }
      )
      .then((res) => {
        this.reservations = res.data.result;
      })
      .catch((err) => {
        console.error(err.response?.data.error ?? err);
      });
  },
};
</script>
