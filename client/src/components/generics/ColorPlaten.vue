<template>
	<div class="wrapper">
		<div
			v-for="(c, i) in colors"
			:key="c"
			:class="`${c === color ? 'focused' : 'circle-button '}`"
			@click="pick(i)"
			:style="`background-color: ${c}`"
		/>
	</div>
</template>
<script>
export default {
  name: "color-platen",
  props: { value: String },
  computed: {
    color: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  data() {
    return {
      idx: 0,
      colors: [
        "#d50000",
        "#f4511e",
        "#33b679",
        "#039be5",
        "#7986cb",
        "#616161",
        "#e67c73",
        "#f6bf26",
        "#0b8043",
        "#3f51b5",
        "#8e24aa",
        "#009688",
      ],
    }
  },
  methods: {
    pick(i) {
      this.color = this.colors[i]
    },
  },
}
</script>
<style scoped lang="scss">
.wrapper {
	width: 300px;
	display: flex;
	flex-wrap: wrap;

	.circle-button {
		width: 14px;
		height: 14px;
		padding: 10px;
		border-radius: 50%;
		box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
		margin-left: 3px;
	}

	.focused {
		border: 2px solid black;
		padding: 8px;
		border-radius: 50%;
		margin: 0 3px;
	}
}
</style>
