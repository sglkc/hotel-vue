<template>
  <footer id="footer" class="text-white">
    <v-container
      class="px-3 pt-5"
      data-aos="slide-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="false"
      fluid
    >
      <v-row class="mb-3 text-high-emphasis text-body-2" justify="center">
        <v-col cols="auto">
          <div class="mb-2">
            <v-icon class="me-2">mdi-map-marker</v-icon>
            Aizu-Wakamatsu, Fukushima Pref. 965-8580, Japan
          </div>
          <div class="mb-2">
            <v-icon class="me-2">mdi-email</v-icon> Email: hotel@mail.co
          </div>
          <div class="mb-2">
            <v-icon class="me-2">mdi-phone</v-icon> Phone: 12345678
          </div>
        </v-col>
        <v-col align="center" cols="auto">
          <div>Follow us on social media!</div>
          <v-btn prepend-icon="mdi-facebook" size="x-small" variant="text">
            hotel.123
          </v-btn>
          <v-btn prepend-icon="mdi-instagram" size="x-small" variant="text">
            @hotel
          </v-btn>
          <v-btn prepend-icon="mdi-twitter" size="x-small" variant="text">
            @hotel
          </v-btn>
        </v-col>
      </v-row>
      <v-row id="copyright">
        <v-col class="py-1 text-caption text-medium-emphasis" align="center">
          All rights reserved &copy; 2022 by sglkc
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style scoped>
#footer {
  background-color: #000930;
  font-family: sans-serif;
}

#copyright {
  background-color: #00051c;
}
</style>

<script>
export default {
  name: "Footer",
};
</script>
