import { useState } from 'react'
import { Container, Group } from '@mantine/core'
import classes from './MainHeader.module.css'
import { NavLink } from 'react-router'

const links = [
  { link: '/', label: '扫码' },
  { link: '/recv', label: '接收' },
]

export function MainHeader() {
  const [active, setActive] = useState(links[0].link)

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link)
      }}
    >
      {link.label}
    </NavLink>
  ))

  return (
    <header className={classes.header}>
      <Container size='md' className={classes.inner}>
        <Group gap={5}>{items}</Group>
      </Container>
    </header>
  )
}
