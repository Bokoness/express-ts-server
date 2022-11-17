<template>
  <v-navigation-drawer app right v-model="openModal">
    <div class="d-flex justify-center">
      <h3
          class="primary--text font-weight-bold mt-3"
          v-text="$t('generics.mainMenu')"
      />
    </div>
    <v-divider class="my-2" />
    <v-list nav dense v-for="(item, i) in items" :key="i">
      <v-list-item
          @click="goRoute(item.route)"
          :disabled="$route.name === item.route"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="item.title" />
      </v-list-item>
    </v-list>
    <v-divider class="mt-10" />
    <v-list-item @click="logout">
      <v-list-item-icon>
        <v-icon color="red">mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="red--text" v-text="$t('auth.logout')" />
    </v-list-item>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "MyDrawer",
  props: { value: Boolean },
  data() {
    return {
      excelDialog: false,
    }
  },
  computed: {
    items() {
      return [
        {
          title: "בית",
          icon: "mdi-home",
          route: "Dashboard",
        },
      ]
    },
    openModal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  methods: {
    goRoute(r) {
      this.$router.push({ name: r })
      this.openModal = false
    },
    async logout() {
      await  this.$store.dispatch("auth/logout", {
        toastOptions: { disabled: true },
      })
    },
  },
}
</script>
