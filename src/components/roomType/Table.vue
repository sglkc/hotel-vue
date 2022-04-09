<template>
  <v-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
          <th>Price</th>
          <th>Rooms</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody v-if="types.length">
        <tr
          v-for="(type, i) in types"
          :style="type.id === selected ? 'background: #EEE' : ''"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td>{{ type.description ?? "-" }}</td>
          <td>
            <v-btn class="pa-0" variant="text">
              <v-img transition="false" :src="type.image || notfound"></v-img>
              <v-dialog activator="parent">
                <v-card>
                  <v-img
                    width="450"
                    :src="type.image || notfound"
                    cover
                  ></v-img>
                </v-card>
              </v-dialog>
            </v-btn>
          </td>
          <td>Rp.{{ type.price }}</td>
          <td>{{ type.total }}</td>
          <td class="text-center">
            <v-btn
              class="ma-1"
              color="error"
              size="small"
              variant="contained-text"
              @click="deleteRoomType(type.id)"
            >
              Delete
            </v-btn>
            <v-btn
              class="ma-1"
              color="warning"
              size="small"
              variant="contained-text"
              @click="updateRoomType(type)"
            >
              Update
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="types">
        <tr>
          <td class="text-center font-weight-bold" colspan="8">
            <v-icon color="red">mdi-exclamation-thick</v-icon>
            <span class="text-red">Room type data is empty</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center font-weight-bold" colspan="8">
            <v-icon class="mdi-spin">mdi-loading</v-icon> Loading room type data
          </td>
        </tr>
      </tbody>
    </template>
  </v-table>
</template>

<script>
import axios from "axios";
import notfound from "@/assets/notfound.png";

export default {
  name: "RoomTypeTable",
  data() {
    return {
      notfound,
      types: false,
      selected: false,
    };
  },
  methods: {
    async getRoomTypes() {
      const res = await axios.get(
        import.meta.env.VITE_API + "/services/room-types"
      );
      this.types = res.data.result;
    },
    updateRoomType(type) {
      this.selected = type.id;
      this.emitter.emit("updateRoomType", type);
    },
    async deleteRoomType(id) {
      axios
        .delete(import.meta.env.VITE_API + "/services/room-types/" + id, {
          headers: {
            Authorization: "bearer " + this.store.state.JWT_TOKEN,
          },
        })
        .then(() => {
          if (this.selected === id) this.emitter.emit("updateRoomType", false);
          this.getRoomTypes();
        })
        .catch((err) => {
          console.error(err.response?.data.error ?? err);
        });
    },
  },
  created() {
    this.emitter.on("getRoomTypes", this.getRoomTypes);
    this.getRoomTypes();
  },
};
</script>
