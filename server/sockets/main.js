import socket from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import authServices from '../services/authServices'

import ExampleSockets from './exampleSockets'

const Main = (server) => {
  try {
    const io = socket(server, {
      allowEIO3: true,
      cors: {
        // add socket origins here
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
        credentials: true,
      },
    })

    // connecting to socket.io admin dashboard
    instrument(io, {
      auth: false,
    })

    io.on('connection', async (socket) => {
      try {
        console.log('connect to web socket')
        const { auth } = socket.handshake.query
        if (!auth) return socket.disconnect()
        const user = await authServices.getUserFromCookie(auth)
        if (!user) return socket.disconnect()
        socket.data.user = user
        let room // add zahi team here
        socket.data.room = room
        socket.join(room)
        socket.on('disconnect', () => {
          console.log('Got disconnect!')
        })

        // Pass the socket modules here
        ExampleSockets(socket, io) // example socket module

        socket.on('error', (err) => {
          // do something on error
          console.log(err)
        })
      } catch (e) {
        socket.disconnect()
      }
    })
  } catch (e) {
    console.log(e)
  }
}

export default Main
