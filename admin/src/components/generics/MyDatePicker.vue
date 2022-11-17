<template>
	<v-dialog
		ref="dialog"
		v-model="modal"
		persistent
		width="290px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-model="date"
				:label="label"
				prepend-icon="mdi-calendar"
				readonly
				solo
				v-bind="attrs"
				v-on="on"
				outlined
				clearable
			/>
		</template>
		<v-date-picker
			v-model="date"
			:min="start"
			:max="end"
			@change="close"
		>
			<v-btn
				@click="close"
				v-text="$t('generics.cancel')"
				text
				color="primary"
			/>
		</v-date-picker>
	</v-dialog>
</template>

<script>

export default {
  name: "my-date-picker",
  props: {
    value: String,
    label: { type: String, default: "" },
    start: { type: String, default: null },
    end: { type: String, default: null },
    validate: { type: Boolean, default: false },
  },
  data() {
    return {
      modal: false,
    }
  },
  computed: {
    date: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  methods: {
    close() {
      this.modal = false
    },
  },
}
</script>
<style>
</style>
