<template>
	<div id="mobile">
		<slot />
	</div>
</template>
<script>
export default {
  name: "MobileView",
}
</script>
<style lang="scss" scoped>
#mobile {
	max-width: 600px;
	margin: 0 auto;
}
</style>
