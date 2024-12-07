import { Container, Text } from '@mantine/core'
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router'

function RecvPage() {
  const { id } = useParams()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io('wss://jmpb.goforcex.top', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
    socketRef.current = socket

    socket.on('connect', () => {
      console.info('Connected to server')

      socket.emit('join', id)
    })

    socket.on('data', (link: string) => {
      console.info(`Received link ${link}`)
      window.location.href = link
    })

    socket.on('disconnect', () => {
      console.info('Disconnected from server')
    })

    socket.onAny((event, ...args) => {
      console.info(`Event ${event} with args ${args}`)
    })

    return () => {
      socket.off('connect')
      socket.off('data')
      socket.off('disconnect')
      socket.offAny()
      socket.disconnect()
    }
  })

  return (
    <>
      <Container>
        <Text>U Just Wait.</Text>
      </Container>
    </>
  )
}

export default RecvPage
