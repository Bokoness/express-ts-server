<template>
	<toggle-button
		:value="toggle"
		:labels="{
      checked: checkLabel,
      unchecked: uncheckLabel,
    }"
		:width="width"
		:color="colors"
		:height="height"
		:font-size="fontSize"
	/>
</template>
<script>
import { ToggleButton } from "vue-js-toggle-button"
export default {
  name: "my-switch",
  components: { ToggleButton },
  props: {
    value: Boolean,
    checkLabel: { type: String, required: true },
    uncheckLabel: { type: String, required: true },
    checkColor: String,
    uncheckColor: String,
    width: { type: Number, default: 130 },
    height: { type: Number, default: 25 },
    fontSize: { type: Number, default: 15 },
  },
  computed: {
    colors() {
      return {
        checked: this.checkColor
          ? this.checkColor
          : this.$vuetify.theme.themes.light.primary,
        unchecked: this.uncheckColor
          ? this.uncheckColor
          : this.$vuetify.theme.themes.light.lightGrey,
      }
    },
    toggle: {
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
