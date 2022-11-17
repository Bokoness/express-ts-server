<template>
	<v-row justify="center">
		<v-col
			cols="2"
			class="d-flex"
		>
			<v-img
				v-if="lastImage && showThumbnail"
				:src="lastImage"
				width="50"
			/>
		</v-col>
		<v-col cols="12">
			<file-pond
				ref="pond"
				label-idle="גררו תמונה לכאן"
				:server="server"
				labelFileLoading="טוען"
				@removefile="handleRemoveFile"
				labelFileLoadError="העלאה נכשלה"
				labelFileProcessing="מעלה"
				labelFileProcessingComplete="העלאה הסתיימה בהצלחה"
				labelFileProcessingAborted="העלאה בוטלה"
				labelFileProcessingError="שגיאה"
				labelTapToCancel="לחץ על מנת לבטל"
				labelTapToRetry="לחץ על מנת לנסוף שוב"
				labelButtonRemoveItem="הסר"
				labelTapToUndo="בטל"
			/>
		</v-col>
	</v-row>
</template>
<script>
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

export default {
  name: "image-upload",
  props: { image: String },
  data() {
    return {
      server: {
        process: this.handleUpload,
      },
      lastImage: null,
      showThumbnail: true
    }
  },
  components: { FilePond },
  watch: {
    image(v) {
      this.lastImage = v
    }
  },
  methods: {
    async handleUpload(fieldName, file, metadata, load) {
      this.lastImage = null
      this.showThumbnail = false
      await this.$emit("handleUpload", file)
      load()
    },
    async handleRemoveFile(error, file) {
      await this.$emit("handleRemoveFile", { error, file })
    }
  },
}
</script>
