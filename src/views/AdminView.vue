<template>
  <LoginForm />
  <KamarTable />
  <KamarForm class="mt-3" />
</template>

<script>
// @ is an alias to /src
import KamarTable from "@/components/KamarTable.vue";
import KamarForm from "@/components/KamarForm.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "AdminView",
  components: {
    KamarTable,
    KamarForm,
    LoginForm,
  },
};
</script>
