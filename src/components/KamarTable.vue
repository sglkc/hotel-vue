<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th>Nama Jenis Kamar</th>
          <th>Jenis Kamar</th>
          <th>Name</th>
          <th>Max Kapasitas</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody v-if="rooms">
        <tr v-for="(room, i) in rooms" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ room.id }}</td>
          <td>{{ room.nama_jenis_kamar }}</td>
          <td>{{ room.jenis_kamar }}</td>
          <td>{{ room.name }}</td>
          <td>{{ room.max_kapasitas }}</td>
          <td>{{ new Date(room.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="7">
            <v-icon class="mdi-spin" size="">mdi-loading</v-icon> Loading data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  name: "KamarTable",
  data() {
    return {
      rooms: false,
    };
  },
  methods: {
    async getKamar() {
      const res = await axios.get(import.meta.env.VITE_API + "/services/kamar");
      this.rooms = res.data.result;
    },
  },
  async mounted() {
    this.emitter.on("getKamar", this.getKamar);
    this.getKamar();
  },
};
</script>
