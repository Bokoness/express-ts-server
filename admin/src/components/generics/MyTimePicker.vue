<template>
	<v-dialog
		ref="dialog"
		v-model="modal"
		persistent
		width="290px"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				v-model="time"
				:label="label"
				prepend-icon="mdi-clock-time-seven"
				clearable
				readonly
				v-bind="attrs"
				v-on="on"
				solo
				outlined
			></v-text-field>
		</template>
		<v-time-picker
			format="24hr"
			v-model="time"
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
		</v-time-picker>
	</v-dialog>
</template>

<script>
export default {
  name: "my-time-picker",
  data() {
    return {
      modal: false,
    }
  },
  props: {
    value: String,
    label: String,
    start: { type: String, default: "" },
    end: { type: String, default: "23:59" },
    validate: { type: Boolean, default: true },
  },
  computed: {
    time: {
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
