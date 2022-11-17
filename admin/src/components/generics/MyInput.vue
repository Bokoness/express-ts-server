<template>
  <div class="my-input">
    <label class="">{{ label }}</label>
    <v-text-field
      v-bind="$attrs"
      v-on="$listeners"
      :label="placeholder"
      outlined
      solo
      class="input"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ["placeholder", "label", "type", "value", "direction"],
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.my-input {
  label {
    text-align: center;
    display: block;
  }
}
</style>
