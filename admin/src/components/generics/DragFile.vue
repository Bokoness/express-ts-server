<template>
	<v-dialog
		v-model="openModal"
		max-width="500"
		persistent
	>
		<v-progress-circular
			v-if="loading"
			indeterminate
			color="primary"
		/>
		<v-card
			v-else
			class="d-flex flex-column justify-start align-center"
		>
			<v-card-title
				class="d-flex justify-space-between"
				style="width: 100%"
			>
				<h4 class="primary--text">{{ title }}</h4>
				<v-btn
					icon
					@click="close"
					color="primary"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text
				class="dragBox d-flex justify-center align-center flex-column"
				@drop.prevent="addFile"
				@dragover.prevent="isDrag = true"
				@dragleave.prevent="isDrag = false"
				@dragend.prevent="isDrag = false"
			>
				<v-icon
					class="text-center"
					size="150px"
					v-text="file ? 'mdi-check-all' : 'mdi-upload'"
					:color="isDrag ? 'primary' : 'grey'"
				/>
			</v-card-text>
			<v-card-actions class="d-flex flex-column">
				<div v-if="file">
					<p class="primary text-center">{{ file.name }}</p>
					<p class="text-center">
						<b>{{ file.size }}</b> kbs
					</p>
				</div>
				<p v-else>Drag the file here</p>
				<v-btn
					:disabled="!file"
					@click="uploadFile"
					text
					color="primary"
					v-text="'Upload'"
				/>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
  name: "DragFile",
  data() {
    return {
      isDrag: false,
      files: [],
      file: null,
      newMenus: null,
    }
  },
  props: {
    title: { type: String, default: "Upload file" },
    value: Boolean,
    handleUpload: { type: Function, required: true },
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
  methods: {
    addFile(e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      const file = droppedFiles[0]
      this.file = file
    },
    removeFile() {
      this.files = []
    },
    async uploadFile() {
      this.loading = true
      await this.handleUpload(this.file)
      this.close()
    },
    close() {
      this.openModal = false
      this.isDrag = false
      this.files = []
      this.file = null
      this.newMenus = null
    },
  },
}
</script>
<style lang="scss" scoped>
.dragBox {
	width: 150px;
}
</style>
