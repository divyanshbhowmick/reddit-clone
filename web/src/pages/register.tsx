import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { mapErrorObj } from '../utils/mapErrorObj'
import { useRegisterMutation } from './../generated/graphql'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation()
  const router = useRouter()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          const response = await register(values)
          if (response?.data?.register?.errors) {
            setErrors(mapErrorObj(response.data.register.errors))
          } else if (response?.data?.register?.user) {
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default Register
