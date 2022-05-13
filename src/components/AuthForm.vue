<template>
  <v-card class="pa-3" elevation="6" height="100%">
    <v-form ref="form">
      <v-card-title class="flex-column justify-center">
        <h3>{{ user ? "Log in to an account" : "Enter your credentials" }}</h3>
      </v-card-title>
      <v-card-subtitle v-if="user" style="width: 25em">
        Please log in or register an account to continue to reservation process.
      </v-card-subtitle>
      <v-container>
        <v-expand-transition>
          <div v-show="registerForm">
            <v-row justify="center">
              <v-col>
                <v-text-field
                  v-model="full_name"
                  density="comfortable"
                  label="Full Name"
                  variant="outlined"
                  :rules="registerForm ? [rules.required] : []"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>
                <v-text-field
                  v-model="phone"
                  density="comfortable"
                  label="Phone Number"
                  variant="outlined"
                  :rules="registerForm ? [rules.required, rules.number] : []"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!user" class="mb-2">
              <v-col>
                <v-item-group
                  v-model="roleId"
                  v-if="roles"
                  selected-class="bg-primary"
                  :rules="[rules.required]"
                  mandatory
                >
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
              variant="outlined"
              :rules="[rules.required, rules.email]"
              :autofocus="!user"
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
              variant="outlined"
              :rules="[rules.required]"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn
              variant="outlined"
              color="success"
              @click="registerForm = !registerForm"
            >
              <v-icon class="me-1">
                {{ registerForm ? "mdi-login" : "mdi-account-plus" }}
              </v-icon>
              {{ registerForm ? "To Login" : "To Register" }}
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              color="primary"
              type="submit"
              @click="registerForm ? register() : login()"
            >
              <v-icon class="me-1">
                {{ registerForm ? "mdi-account-plus" : "mdi-login" }}
              </v-icon>
              {{ registerForm ? "Register" : "Login" }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-expand-transition>
            <v-col v-show="message || fail" cols="auto">
              <v-alert density="compact" type="error" variant="contained-text">
                {{ fail || message }}
              </v-alert>
            </v-col>
          </v-expand-transition>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    message: String,
    user: Boolean,
  },
  data() {
    return {
      full_name: null,
      roleId: this.user ? 3 : null,
      email: null,
      phone: null,
      password: null,
      rules: {
        email: (v) => {
          const pattern = /^[\w]+@\w+\.[a-z]{2,}$/;
          return pattern.test(v) || "Invalid e-mail";
        },
        required: (v) => !!v || "Required",
        number: (v) => Number.isInteger(Number(v)) || "Must be number",
      },
      fail: false,
      registerForm: false,
      roles: [
        {
          id: 1,
          name: "admin",
        },
        {
          id: 2,
          name: "receptionist",
        },
        {
          id: 3,
          name: "user",
        },
      ],
    };
  },
  methods: {
    async register() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return (this.fail = "Please complete the form");
      if (!this.roleId) return (this.fail = "Select a role for the account");

      this.registerForm = false;
    },
    async login() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return (this.fail = "Please complete the form");

      if (this.email !== "dummy@dum.my" && this.password !== "password") {
        return (this.fail =
          'Try the email: "dummy@dum.my" and password: "password"');
      }

      this.store.commit("setJWT", "TESTTOKEN");
      this.store.commit("setUser", {
        role_name: "admin",
        id: 1,
        full_name: "Dummy",
        email: "dummy@dum.my",
        phone: "12345678",
        role: 3,
      });
      this.emitter.emit("refreshView", true);
    },
  },
};
</script>
