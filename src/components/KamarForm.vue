<template>
  <v-form ref="form">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="2">
          <v-text-field
            v-model="name"
            label="Nama"
            prepend-icon="mdi-rename-box"
            variant="underlined"
            :rules="[required]"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="jenisKamar"
            label="Jenis Kamar"
            prepend-icon="mdi-bed-king"
            variant="underlined"
            :rules="[required]"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="maxKapasitas"
            type="number"
            label="Max Kapasitas"
            min="1"
            prepend-icon="mdi-account-multiple"
            variant="underlined"
            :rules="[required]"
            :value="maxKapasitas"
            hide-details
            required
          ></v-text-field>
        </v-col>
        <v-col class="mt-3" cols="auto">
          <div class="d-flex align-center">
            <v-btn color="success" size="x-small" icon @click="addInventory">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <label class="mx-3 text-center">
              Inventory (Max. {{ maxInventory }})
            </label>
            <v-btn color="warning" size="x-small" icon @click="removeInventory">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
          <v-text-field
            v-for="(name, i) in inventory"
            v-model="inventory[i]"
            class="mt-3"
            :rules="[required]"
            variant="underlined"
            :label="'Inventory ' + (i + 1)"
            :key="i"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col class="mt-2 mb-sm-0 mb-3" cols="auto">
          <v-btn
            color="primary"
            type="submit"
            variant="outlined"
            @click="sumbit"
          >
            <v-icon>mdi-send</v-icon> Sumbit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "KamarForm",
  data() {
    return {
      name: "",
      jenisKamar: "",
      maxKapasitas: 1,
      inventory: [""],
      maxInventory: 10,
      required: (v) => !!v || "Required",
    };
  },
  methods: {
    addInventory() {
      if (this.inventory.length + 1 > this.maxInventory) return;
      this.inventory.push("");
    },
    removeInventory() {
      if (this.inventory.length - 1 < 1) return;
      this.inventory.pop();
    },
    async sumbit() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      const body = {
        name: this.name,
        jenis_kamar: this.jenisKamar,
        max_kapasitas: this.maxKapasitas,
        inventory: this.inventory,
      };

      axios
        .post(import.meta.env.VITE_API + "/services/kamar", body)
        .then(() => {
          this.emitter.emit("getKamar");
        })
        .catch(console.error);
    },
  },
};
</script>
