import { Formik, Form, Field } from 'formik';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage, Button, Input, Text, Heading, Link, Stack
} from '@chakra-ui/react'

const LotteryForm = () => {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required"
    } else if (value.toLowerCase() !== "naruto") {
      error = "Name invalid 😱"
    }
    return error;
  }

  return (
    <Flex direction="column" justifyContent="flex-start" mt={20} alignItems="center" height="100vh">
      <Heading my={8}>2021 Spring Lottery</Heading>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {props => (
          <Form>
            <Stack spacing={6}>
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="name">First Name</FormLabel>
                    <Input {...field} id="name" placeholder="Harkness" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input {...field} id="lastName" placeholder="Forever" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tNumber" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel htmlFor="lastName">T-Number</FormLabel>
                    <Input {...field} id="lastName" placeholder="T-0000000" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
            </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}

export default LotteryForm;