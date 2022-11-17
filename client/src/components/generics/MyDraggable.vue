<template>
	<div class="min-h-screen w-screen bg-gray-200 flex items-center justify-center">
		<draggable
			:list="items"
			:animation="200"
			ghost-class="moving-chip"
			group="item"
			filter=".action-button"
			class="w-full max-w-md"
			tag="ul"
		>
			<v-row
				v-for="(item, i) in items"
				:key="i"
				class="center-all ma-2"
			>
				<v-col
					cols="1"
					class="mouse-grabbing"
				>
					<v-icon large>mdi-drag</v-icon>
				</v-col>
				<v-col
					cols="1"
					class="mouse-grabbing"
				>{{ i + 1 + ". " }}</v-col>
				<v-col
					cols="9"
					class="mouse-grabbing"
				>{{ item.name }}</v-col>
				<v-col cols="1">
					<v-icon
						medium
						@click="remove(item, i)"
					>mdi-delete</v-icon>
				</v-col>
			</v-row>
		</draggable>
	</div>
</template>

<script>
import draggable from "vuedraggable"
export default {
  name: "my-draggable",
  props: { items: Array },
  data() {
    return {
      enabled: true,
      dragging: false,
    }
  },
  components: {
    draggable,
  },
  methods: {
    remove(item, i) {
      this.$emit("deleteSelect", item, i)
    },
  },
}
</script>

<style>
/* Unfortunately @apply cannot be setup in codesandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.moving-chip {
	opacity: 0.5;
	background: #f7fafc;
	border: 2px solid #4299e1;
}
</style>
