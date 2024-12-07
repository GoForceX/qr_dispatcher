import { Button, Container, TextInput } from '@mantine/core'
import { useField } from '@mantine/form'

function RecvJoinPage() {
  const field = useField({
    initialValue: '',
    validate: (value) => (value.trim().length !== 8 ? '这不对吧？' : null),
  })

  return (
    <>
      <Container>
        <TextInput {...field.getInputProps()} label='房间号？' placeholder='H2uc...' mb='md' />
        <Button onClick={field.validate}>Join!</Button>
      </Container>
    </>
  )
}

export default RecvJoinPage
