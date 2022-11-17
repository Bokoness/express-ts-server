<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				text
				rounded
				v-bind="attrs"
				v-on="on"
				:color="color"
				@click="onClick"
				:disabled="disabled"
			>
				<v-icon>{{ icon }}</v-icon>
			</v-btn>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>
<script>
export default {
  name: "icon-btn-tooltip",
  props: {
    icon: String,
    color: { type: String, default: "primary" },
    tooltip: String,
    disabled: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("cb")
    },
  },
}
</script>
