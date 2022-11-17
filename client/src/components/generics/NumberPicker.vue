<template>
	<div>
		<div>{{ label }}</div>
		<vue-numeric-input
			v-model="num"
			:min="min"
			:max="max"
			:step="step"
			width="80px"
			controlsType="updown"
			align="center"
			:disabled="disabled"
		/>
	</div>
</template>

<script>
export default {
  name: "number-picker",
  props: {
    value: Number,
    label: String,
    max: { type: Number, default: Number.MAX_VALUE },
    min: { type: Number, default: 1 },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    num: {
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
