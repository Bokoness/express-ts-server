const ExampleSocket = (socket, io) => {
  socket.on('example', async (data) => {
    try {
      const { user } = socket.data
      const { room } = socket.data
      io.to(room).emit('example', {
        name: 'example',
      })
    } catch (e) {
      console.error(e.message)
    }
  })
}

export default ExampleSocket
