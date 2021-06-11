import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { createClient, Provider, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import theme from '../theme'
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql'
import { betterUpdateQuery } from './../utils/helper'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                console.log('Result', result)
                console.log('Query', query)
                if (result.login.errors) return query
                else return { me: result.login.user }
              }
            )
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) return query
                else return { me: result.register.user }
              }
            )
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: 'include',
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
