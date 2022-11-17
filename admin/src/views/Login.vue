<template>
  <div class="home">
    <v-container class="form-container d-flex justify-space-between flex-column mt-12">
      <form @submit.prevent="submit">
        <v-row justify="center">
          <v-col md="8" cols="10">
            <v-text-field
                v-model="email"
                :label="$t('auth.email')"
                :rules="[rules.usernameRequired]"
                required
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="8" cols="10">
            <v-text-field
                v-model="password"
                :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                :label="$t('auth.password')"
                :type="showpass ? 'text' : 'password'"
                :rules="[rules.passRequired, rules.min]"
                @click:append="showpass = !showpass"
                minlength="6"
                required
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn
                @click="submit"
                text
                color="primary"
                :disabled="!isValidForm"
                v-text="$t('auth.login')"
            />
          </v-col>
        </v-row>
      </form>
      <v-alert
          v-if="isAlertMessage"
          outlined
          type="error"
          class="d-flex justify-center mt-5"
      >{{ this.error }}</v-alert>
      <div class="progress">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate v-if="loading" />
      </div>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "LoginPage",
  data: () => {
    return {
      email: "",
      password: "",
      isAlertMessage: false,
      loading: false,
      role: null,
      showpass: false,
    }
  },
  computed: {
    isValidForm() {
      return this.email && this.password && this.password.length >= 6
    },
    rules() {
      return {
        usernameRequired: (v) => !!v || this.$t("errors.auth.email"),
        passRequired: (v) => !!v || this.$t("errors.auth.pass"),
        min: (v) => v.length >= 6 || this.$t("errors.auth.minlen6"),
      }
    },
  },
  methods: {
    async submit() {
      this.loading = true
      try {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
          toastOptions: { disabled: true },
        })
        this.$router.push({ name: "Dashboard" })
      } catch (e) {
        console.log("No auth")
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  .progress {
    margin: 20% auto;
  }
}
</style>
