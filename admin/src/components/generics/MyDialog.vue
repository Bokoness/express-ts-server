<template>
	<v-dialog
		v-model="openModal"
		:max-width="maxWidth"
		:fullscreen="fullscreen"
		:persistent="persistent"
	>
		<v-card>
			<v-toolbar
				flat
				max-height="60"
			>
				<v-card-title
					class="primary--text"
					v-text="title"
				/>
				<v-spacer />
				<v-btn
					icon
					@click="openModal = false"
					color="primary"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-card-text></v-card-text>
			<v-spacer />
			<v-card-text class="d-flex justify-center flex-column">
				<slot name="content" />
			</v-card-text>
			<v-card-actions class="d-flex justify-center">
				<slot name="actions" />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  name: "myDialog",
  data: () => ({
    loading: false,
  }),
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: true
    },
    maxWidth: { type: Number, default: 900 },
    value: Boolean,
    title: String,
  },
  computed: {
    openModal: {
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
