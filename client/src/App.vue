<template>
  <v-app>
    <my-drawer v-if="showDrawer" v-model="drawer" />
    <v-main>
      <my-navbar v-if="showDrawer" @toggleDrawer="toggleDrawer" />
      <router-view />
    </v-main>
    <close-app-footer v-if="showFooter" />
  </v-app>
</template>

<script>
import { isRtlLang } from "./i18n"
import MyNavbar from "@/layouts/Navbar"
import CloseAppFooter from "@/layouts/CloseAppFooter"
import MyDrawer from "@/layouts/Drawer"

export default {
  name: "App",
  components: {
    MyNavbar,
    CloseAppFooter,
    MyDrawer,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar
    },
    showFooter() {
      return false
    },
    showDrawer() {
      return this.$route.name !== "Login"
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
  watch: {
    "$i18n.locale": function (newLocale) {
      this.$vuetify.rtl = isRtlLang(newLocale)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
