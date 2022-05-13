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
import notfound from "@/assets/notfound.png";

export default {
  name: "RoomTypeTable",
  data() {
    return {
      notfound,
      types: [
        {
          id: 1,
          name: "Regular",
          description:
            "Just wanted to have a leisure? This room is perfect for you and your wallet.",
          image:
            "https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg",
          price: 160000,
          total: 15,
        },
        {
          id: 2,
          name: "Exclusive",
          description:
            "Get more comfortable with a living room and a balcony with the city view.",
          image:
            "https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg",
          price: 500000,
          total: 10,
        },
        {
          id: 3,
          name: "Premium",
          description:
            "Feel like home, complete with a living room, a dining room, and a fully equipped kitchen.",
          image:
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q60",
          price: 1290000,
          total: 5,
        },
      ],
      selected: false,
    };
  },
  methods: {
    getRoomTypes() {},
    updateRoomType(type) {
      this.selected = type.id;
      this.emitter.emit("updateRoomType", type);
    },
    deleteRoomType(id) {
      if (this.selected === id) this.emitter.emit("updateRoomType", false);
    },
  },
  created() {
    this.emitter.on("getRoomTypes", this.getRoomTypes);
    this.getRoomTypes();
  },
};
</script>
