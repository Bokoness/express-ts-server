const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: `http://localhost:${process.env.SERVER_PORT}`,
  },
})
