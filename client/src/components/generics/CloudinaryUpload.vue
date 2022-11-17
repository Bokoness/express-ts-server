<template>
	<simple-image-upload
		@handleUpload="handleUpload"
		:image="image"
	/>
</template>
<script>
import axios from "axios"
import SimpleImageUpload from "@/components/SimpleImageUpload.vue"
export default {
  name: "cloudinary-upload",
  props: {
    folder: String,
    value: Object
  },
  components: { SimpleImageUpload },
  computed: {
    image: {
      get() {
        return this.value ? this.value.url : ''
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  methods: {
    async handleUpload(file) {
      const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD}/upload`
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET)
      if (this.folder) formData.append('folder', this.folder)
      let { data } = await axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData,
      })
      this.image = {
        publicId: data.public_id,
        url: data.url
      }
    }
  },
}
</script>
