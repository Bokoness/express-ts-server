<template>
  <v-footer id="dashboard-core-footer" class="d-flex justify-center">
    <v-container>
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="12" md="auto">
          <div
            class="body-1 font-weight-light pt-6 pt-md-0 text-center"
            style="direction: ltr"
          >
            &copy; 2022, made by
            <a href="https://www.closeapp.co.il">CloseApp Team</a> for a better
            web.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "DashboardCoreFooter",

  data: () => ({}),
}
</script>

<style lang="scss" scoped>
#dashboard-core-footer {
  a {
    font-size: 0.825rem;
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
