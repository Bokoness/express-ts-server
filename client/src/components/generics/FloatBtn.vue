<template>
	<v-btn
		color="primary"
		fixed
		bottom
		left
		fab
		@click="handleClick"
	>
		<v-icon>mdi-plus</v-icon>
	</v-btn>
</template>

<script>
export default {
  name: "float-btn",
  methods: {
    handleClick() {
      this.$emit('cb')
    }
  }
}
</script>

<style scoped>
</style>
