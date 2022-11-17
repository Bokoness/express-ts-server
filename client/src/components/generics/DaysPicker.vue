<template>
	<div class="d-flex days">
		<v-checkbox
			v-model="all"
			:label="$t('generics.all')"
			class="mx-2"
		/>
		<v-checkbox
			v-for="i in dayList"
			:key="i"
			:value="i"
			:label="$t(`days[${i}].short`)"
			class="mx-2"
			v-model="days"
		/>
	</div>
</template>
<script>
export default {
  name: "days-picker",
  props: {
    value: Array,
  },
  data() {
    return {
      all: false,
      dayList: [0, 1, 2, 3, 4, 5, 6]
    }
  },
  computed: {
    days: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  watch: {
    all(v) {
      this.days = v ? this.days = [0, 1, 2, 3, 4, 5, 6] : []
    }
  },
}
</script>
