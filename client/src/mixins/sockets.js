const sockets = {
  sockets: {
    //this is an example socket listener
    async alert(data) {
      console.log(data)
    },
  },
  methods: {
    // example socket named test
    socket_test(data) {
      this.$socket.client.emit("admin/askEscort", data)
    },
  },
}

export default sockets
