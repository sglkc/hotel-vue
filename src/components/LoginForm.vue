<template>
  <v-form ref="form">
    <v-card class="pa-3" elevation="6">
      <v-card-title class="justify-center">
        <h3>Enter your credentials</h3>
      </v-card-title>
      <v-container>
        <v-row justify="center">
          <v-col>
            <v-text-field
              v-model="email"
              density="comfortable"
              label="Email"
              :rules="[rules.required, rules.email]"
              autofocus
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field
              v-model="password"
              density="comfortable"
              label="Password"
              type="password"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" align-self="center">
            <v-btn
              variant="outlined"
              color="primary"
              type="submit"
              @click="login"
            >
              <v-icon>mdi-login</v-icon> Login
            </v-btn>
          </v-col>
          <v-expand-transition>
            <v-col v-show="fail" cols="auto">
              <v-alert density="compact" type="error">Gagal Logan</v-alert>
            </v-col>
          </v-expand-transition>
        </v-row>
      </v-container>
    </v-card>
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
      fail: false,
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
          this.emitter.emit("tryLogin");
        })
        .catch(() => {
          this.fail = true;
        });
    },
  },
};
</script>
