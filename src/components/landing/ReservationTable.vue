<template>
  <v-card class="px-3 px-sm-5 py-3">
    <v-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Name</th>
            <th>Room Type</th>
            <th>Total (Rp)</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Reserved On</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="reservations.length">
          <tr v-for="(reservation, i) in reservations" :key="i">
            <td>{{ reservation.id }}</td>
            <td>{{ reservation.room_name }}</td>
            <td>{{ reservation.room_type }}</td>
            <td>{{ reservation.price }}</td>
            <td>{{ new Date(reservation.checkin).toLocaleDateString() }}</td>
            <td>{{ new Date(reservation.checkout).toLocaleDateString() }}</td>
            <td>{{ new Date(reservation.created_at).toLocaleString() }}</td>
            <td class="text-center">
              <v-btn
                class="ma-1"
                color="error"
                size="small"
                variant="contained-text"
                @click="cancel(reservation.id)"
              >
                Cancel
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="reservations">
          <tr>
            <td class="text-center font-weight-bold" colspan="7">
              <v-icon class="me-2">mdi-exclamation-thick</v-icon>
              Reservations are empty
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center font-weight-bold" colspan="7">
              <v-icon class="mdi-spin">mdi-loading</v-icon> Loading reservations
            </td>
          </tr>
        </tbody>
      </template>
    </v-table>
    <v-card-subtitle class="pa-0 mt-2 justify-center">
      You will have to print out the receipt and give it to the receptionists
    </v-card-subtitle>
    <v-row class="mt-3 mx-1 pb-2">
      <v-col class="pa-0 me-1">
        <v-btn
          color="red"
          density="comfortable"
          variant="text"
          @click="toggleForm"
          block
        >
          Back to Form
        </v-btn>
      </v-col>
      <v-col class="pa-0 ms-1">
        <v-btn
          color="primary"
          density="comfortable"
          variant="outlined"
          @click="getReceipt"
          block
        >
          Get Receipt
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationTable",
  data() {
    return {
      user: this.store.state.USER,
      reservations: [],
    };
  },
  methods: {
    toggleForm() {
      this.emitter.emit("toggleForm", true);
    },
    getReservations() {
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
    cancel(id) {
      axios
        .delete(import.meta.env.VITE_API + "/services/reservations/" + id, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          this.getReservations();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  created() {
    this.getReservations();
  },
};
</script>
