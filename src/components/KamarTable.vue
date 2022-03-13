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
          <td class="text-center font-weight-bold" colspan="7">Loading data</td>
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
  async mounted() {
    try {
      const res = await axios.get("http://103.166.156.163/services/kamar");
      this.rooms = res.data.result;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
