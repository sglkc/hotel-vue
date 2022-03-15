<template>
  <v-form ref="form">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-text-field
            v-model="email"
            density="compact"
            label="Email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="password"
            density="compact"
            label="Password"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn variant="outlined" color="primary" @click="login">
            <v-icon>mdi-login</v-icon> Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      rules: {
        email: (v) => {
          const pattern = /^[\w]+@\w+\.[a-z]{2,}$/;
          return pattern.test(v) || "Invalid e-mail";
        },
        required: (v) => !!v || "Required",
      },
    };
  },
  methods: {
    async login() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      const body = {
        email: this.email,
        password: this.password,
      };

      axios
        .post(import.meta.env.VITE_API + "/auth/login", body)
        .then((res) => {
          this.store.commit("setJWT", res.data.data.token);
          this.store.commit("setUser", res.data.data.user);
          this.emitter.emit("getKamar");
        })
        .catch(console.error);
    },
  },
};
</script>
