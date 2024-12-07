import { UnstyledButton, Group, ThemeIcon, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

interface SideLinkProps {
  className?: string
  icon: React.ReactNode
  color: string
  label: string
  display?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function SideLink({ className, icon, color, label, display, onClick }: SideLinkProps) {
  const theme = useMantineTheme()
  return (
    <UnstyledButton
      display={display}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
      }}
      onClick={onClick}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}
