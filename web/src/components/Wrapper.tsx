import { Box } from '@chakra-ui/react'
import React from 'react'

interface WrapperProps {
  variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      mt="10"
      mx="auto"
      w="100%"
      maxW={variant === 'regular' ? '800px' : '400px'}
    >
      {children}
    </Box>
  )
}
