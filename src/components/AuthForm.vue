<template>
  <v-form ref="form">
    <v-card class="pa-3" elevation="6" height="100%">
      <v-card-title class="justify-center">
        <h3>Enter your credentials</h3>
      </v-card-title>
      <v-container>
        <v-expand-transition>
          <div v-show="registerForm">
            <v-row justify="center">
              <v-col>
                <v-text-field
                  v-model="name"
                  desnity="comfortable"
                  label="Full Name"
                  :rules="registerForm ? [rules.required] : []"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-item-group
                  v-model="roleId"
                  v-if="roles"
                  selected-class="bg-primary"
                  :rules="[rules.required]"
                  mandatory
                >
                  <span class="mx-3">Select Role</span>
                  <v-item
                    v-for="role in roles"
                    v-slot="{ selectedClass, toggle }"
                    :value="role.id"
                    :key="role.id"
                  >
                    <v-chip
                      class="me-1"
                      size="large"
                      :class="selectedClass"
                      @click="toggle"
                    >
                      {{ role.name }}
                    </v-chip>
                  </v-item>
                </v-item-group>
                <div v-else>
                  <v-icon color="red">mdi-exclamation-thick</v-icon>
                  <span class="text-red">Unable to get roles</span>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
        <v-row justify="center">
          <v-col>
            <v-text-field
              v-model="email"
              density="comfortable"
              label="Email"
              :rules="[rules.required, rules.email]"
              autofocus
              hide-details
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
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-btn
              variant="outlined"
              color="success"
              @click="registerForm = !registerForm"
            >
              <v-icon>
                {{ registerForm ? "mdi-login" : "mdi-account-plus" }}
              </v-icon>
              {{ registerForm ? "To Login" : "To Register" }}
            </v-btn>
          </v-col>
          <v-col cols="auto" align-self="center">
            <v-btn
              color="primary"
              type="submit"
              @click="registerForm ? register() : login()"
            >
              <v-icon>
                {{ registerForm ? "mdi-account-plus" : "mdi-login" }}
              </v-icon>
              {{ registerForm ? "Register" : "Login" }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-expand-transition>
            <v-col v-show="fail" cols="auto">
              <v-alert density="compact" type="error">{{ fail }}</v-alert>
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
      name: "",
      roleId: "",
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
      registerForm: false,
      roles: false,
    };
  },
  methods: {
    async register() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return (this.fail = "Please complete the form");
      if (!this.roleId) return (this.fail = "Select a role for the account");

      const body = {
        full_name: this.name,
        email: this.email,
        password: this.password,
        role: this.roleId,
      };

      axios
        .post(import.meta.env.VITE_API + "/auth/register", body)
        .then(() => {
          this.fail = false;
          this.registerForm = false;
        })
        .catch((err) => {
          this.fail = err.response?.data.error ?? err;
        });
    },
    async login() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return (this.fail = "Please complete the form");

      const body = {
        email: this.email,
        password: this.password,
      };

      axios
        .post(import.meta.env.VITE_API + "/auth/login", body)
        .then((res) => {
          this.store.commit("setJWT", res.data.result.token);
          this.store.commit("setUser", res.data.result.user);
          this.emitter.emit("refreshAdminView", true);
        })
        .catch((err) => {
          this.fail = err.response?.data.error ?? err;
        });
    },
  },
  async created() {
    if (this.store.state.JWT_TOKEN) this.fail = "Token expired";

    axios
      .get(import.meta.env.VITE_API + "/auth/roles")
      .then((res) => {
        this.roles = res.data.result;
      })
      .catch((err) => {
        console.error(err.response?.data.error ?? err);
      });
  },
};
</script>
