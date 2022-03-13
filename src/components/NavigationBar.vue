<template>
  <v-navigation-drawer rail-width="52" expand-on-hover rail permanent>
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="(item, i) in items"
        class="px-2"
        :key="i"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.title"
        @click="this.$router.push(item.link)"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      rail: true,
      items: [
        { title: "Admin", icon: "mdi-account", link: "/" },
        { title: "Kamar", icon: "mdi-bed-king", link: "/about" },
      ],
    };
  },
  methods: {
    onClickOutside() {
      this.rail = false;
    },
  },
};
</script>
