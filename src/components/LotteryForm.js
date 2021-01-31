import { Formik, Form, Field } from 'formik';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage, Button, Input, Text, Heading, Link, Stack, Center, Select
} from '@chakra-ui/react'
import { useState } from 'react'
// import LotteryPreferenceList from './LotteryPreferenceList';

const LotteryForm = ({onSubmit}) => {
  const [choices, setChoices] = useState(
    [
      'Harkness Housing',
      'Harkness Dining',
      'Keep Housing',
      'Keep Dining',
      'Tank Housing',
      'Tank Dining',
    ]
  );

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required"
    }
    return error;
  }

  function validateTNumber(number) {
    const tNumberRegEx = /^t\-?\d{8}$/i;

    let error;
    if (!number) {
      error = "T-Number is required"
    } else if (!tNumberRegEx.test(number)) {
      error = "Invalid T-number. Please, include a T. 😱" // is this 8 digits max?      
    }
    return error;
  }

  return (
    <Flex shadow="md" w="100%" borderRadius="lg" borderWidth="1px" overflow="hidden" direction="column" justifyContent="flex-start" mt={20} alignItems="center" pb={8}>
      <Center mb={4} p={4} w="100%" shadow="sm">
        <Heading >2021 Spring Lottery</Heading>
      </Center>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          tNumber: "",
          preferences: [],
        }}
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <Stack spacing={6}>
              <Field name="firstName" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input {...field} id="firstName" placeholder="Harkness" />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName" validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input {...field} id="lastName" placeholder="Forever" />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tNumber" validate={validateTNumber}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.tNumber && form.touched.tNumber}>
                    <FormLabel htmlFor="tNumber">T-Number</FormLabel>
                    <Input {...field} id="tNumber" placeholder="T-0000000" />
                    <FormErrorMessage>{form.errors.tNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <h1>Coop Preference Ranking: </h1>
              <Field name="preferences[0]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="1">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[1]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="2">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[2]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="3">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[3]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="4">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[4]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="5">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[5]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="6">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
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
