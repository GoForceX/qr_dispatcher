import { useEffect, useRef, useState } from 'react'
import { Container, Text } from '@mantine/core'
import { QrReader } from 'react-qr-reader'
import { io, Socket } from 'socket.io-client'

function ScanPage() {
  const [data, setData] = useState('No result')
  const [roomId, setRoomId] = useState('')
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io('wss://jmpb.goforcex.top', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
    socketRef.current = socket

    socket.on('connect', () => {
      console.info('Connected to server')

      if (!roomId) {
        socket.emit('create')
      }
    })

    socket.on('created', (room: string) => {
      setRoomId(room)
      console.info(`Created room ${room}`)
    })

    socket.on('disconnect', () => {
      console.info('Disconnected from server')
    })

    socket.onAny((event, ...args) => {
      console.info(`Event ${event} with args ${args}`)
    })

    const handleBeforeUnload = () => {
      if (roomId) {
        socket.emit('leave', roomId)
        setRoomId('')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('created')
      socket.offAny()
      window.removeEventListener('beforeunload', handleBeforeUnload)
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <Container style={{ width: '100vw', paddingTop: '16px' }}>
        <QrReader
          onResult={(result, error) => {
            if (result) {
              const text = result.getText()
              if (data !== text) {
                socketRef.current?.emit('send', text)
                setData(text)
              }
            }

            if (error) {
              console.info(error)
            }
          }}
          constraints={{ facingMode: 'environment' }}
          videoStyle={{ width: '100%', position: 'static' }}
          videoContainerStyle={{ paddingTop: '0' }}
        />
        <Text ta='center' style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
          Share the link: <br /> https://jmp.goforcex.top/recv/{roomId}
        </Text>
        <Text ta='center' style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
          {data}
        </Text>
      </Container>
    </>
  )
}

export default ScanPage
