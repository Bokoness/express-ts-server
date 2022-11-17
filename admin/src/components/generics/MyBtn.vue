<template>
  <v-btn
      :class="`${color}--text`"
      color="primary"
      class="my-btn"
      rounded
      large
      :width="300"
      v-on="$listeners"
      v-bind="$attrs"
  >
    <span>{{ text }}</span>
    <v-icon v-if="icon" dark class="primary--text">{{ icon }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "my-btn",
  props: {
    icon: {type: String, default: ""},
    text: {type: String, default: ""},
    color: {type: String, default: "white"},
  },
}
</script>
<style scoped>
.my-btn {
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  height: 58px !important;
  font-size: 26px;
  font-weight: 600;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
}

#btn-txt {
  font-size: 50px;
}
</style>
