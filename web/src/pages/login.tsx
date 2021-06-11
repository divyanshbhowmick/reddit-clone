import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { mapErrorObj } from '../utils/mapErrorObj'
import { useLoginMutation } from './../generated/graphql'

const Register: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const response = await login({ options: values })
          if (response?.data?.login?.errors) {
            setErrors(mapErrorObj(response.data.login.errors))
          } else if (response?.data?.login?.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <Button
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default Register
