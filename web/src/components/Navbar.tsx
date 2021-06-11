import { Button, Flex, Icon, Link, Text } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery } from './../generated/graphql'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery()
  let NavItems = null
  if (fetching) {
    NavItems = null
  } else if (!data?.me) {
    console.log(data)

    NavItems = (
      <>
        <NextLink href="/login">
          <Link mr={4} fontSize={20}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={4} fontSize={20}>
            register
          </Link>
        </NextLink>
      </>
    )
  } else {
    console.log(data)
    NavItems = (
      <>
        <Text mr={5}>{data?.me.username}</Text>
        <Button variant="link" colorScheme="black">
          logout
        </Button>
      </>
    )
  }
  return (
    <Flex p={7} bg="skyblue" alignItems="center" justifyContent="flex-end">
      <Icon mr="auto" />
      <Flex justifyContent="flex-end" alignItems="center">
        {NavItems}
      </Flex>
    </Flex>
  )
}
