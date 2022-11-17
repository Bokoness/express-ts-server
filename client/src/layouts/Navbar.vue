<template>
  <v-app-bar color="#fcdaad00" flat>
    <v-row>
      <v-col cols="1">
        <div
          class="d-flex justify-space-between align-center px-5"
        >
          <v-icon color="black" @click="openDrawer" large> mdi-menu </v-icon>
        </div>
      </v-col>
      <v-col cols="10 text-center">
        <span>{{`${$t('generics.hello')} `}}</span>
        <span> {{$store.getters.fullName}}</span>
      </v-col>
      <v-col cols="1"> </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-navbar",
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    isAuth() {
      // TODO: uncomment this after login is working.
      // return this.$store.getters.isAuth;
      return true
    },
    isAdmin() {
      return this.$route.path.includes("admin")
    },
  },
  methods: {
    openDrawer() {
      this.$emit("toggleDrawer")
    },
    canGoBack() {
      if (
        window &&
        window.history &&
        window.history.length &&
        window.history.length > 2
      )
        return true
      return false
    },
    goBack() {
      if (this.canGoBack) {
        this.$router.back()
      }
    },
  },
}
</script>
