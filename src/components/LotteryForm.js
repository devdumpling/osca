import { Formik, Form, Field } from 'formik';
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage, Button, Input, Text, Heading, Link, Stack, Center, Select, Divider, Checkbox, CheckboxGroup
} from '@chakra-ui/react'
import { useState } from 'react'
// import LotteryPreferenceList from './LotteryPreferenceList';

const LotteryForm = ({ onSubmit, currentEntryValues }) => {
  const [choices, setChoices] = useState(
    [
      'Harkness Housing & Dining',
      'Harkness Dining-only',
      'Tank Housing & Dining',
      'Tank Dining-only',
      'Keep Housing & Dining',
      'Keep Dining-only',
      'Pyle Inn Dining-only',
      'Third World Co-op Dining-Only',
      'Third World Co-op Dining and Third World Social Justice Housing',
      'Old Barrows Housing (choice of OSCA dining)',
      'Brown Bag Co-op'
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

  function validateOCMR(ocmr) {
    const ocmrRegEx = /^\d{4}$/i;

    let error;
    if (!ocmr) {
      error = "OCMR is required"
    } else if (!ocmrRegEx.test(ocmr)) {
      error = "Invalid OCMR! 😱" // is this 4 digits max?      
    }
    return error;
  }

  return (
    <Flex shadow="md" w="100%" borderRadius="lg" borderWidth="1px" overflow="hidden" direction="column" justifyContent="flex-start" mt={20} alignItems="center" pb={8}>
      <Center mb={4} p={4} w="100%" shadow="sm">
        <Heading >2021 Spring Lottery</Heading>
      </Center>
      <Stack textAlign="left" spacing={4} p={4} my={4}>
        <Text fontSize="lg">
          The OSCA Lottery Process
        </Text>
        <Text>
          All Oberlin College students who wish to be in OSCA during Fall 2021 and/or Spring 2022 must fill out this lottery form.
        </Text>
        <Text>
          This lottery is not for incoming first-years or transfer students who will have an opportunity to join during Summer 2021.
          Each student’s entry will generate a random number which determines their rank in the lottery, ensuring all students have an equal chance at membership in a co-op.
          Under the recent lease with Oberlin College, this lottery and its resulting membership will determine the buildings OSCA is able to lease for the 2021-22 academic year.
        </Text>
        <Text>
          Potential members of special interest coops (Old Barrows, Third World Co-op, and Third World Social Justice Co-op Housing)
          must fill out an additional special interest application prior to February 12th at 11:59pm separate from this lottery.
        </Text>
        <Text>
          For questions, comments, or concerns, please reach out to the All-OSCA officers at mfox2@oberlin.edu.
        </Text>
      </Stack>
      <Formik
        initialValues={currentEntryValues ? currentEntryValues : {
          firstName: "",
          lastName: "",
          OCMR: "",
          tNumber: "",
          comfortableWithAnyRoommate: false,
          preferences: [],
        }}
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <Stack spacing={6} p={2}>
              <Stack direction={["column", "row"]} spacing={2}>
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
              </Stack>
              <Stack direction={["column", "row"]} spacing={2}>
                <Field name="tNumber" validate={validateTNumber}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.tNumber && form.touched.tNumber}>
                      <FormLabel htmlFor="tNumber">T-Number</FormLabel>
                      <Input {...field} id="tNumber" placeholder="T-0000000" />
                      <FormErrorMessage>{form.errors.tNumber}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="OCMR" validate={validateOCMR}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.OCMR && form.touched.OCMR}>
                      <FormLabel htmlFor="OCMR">OCMR</FormLabel>
                      <Input {...field} id="OCMR" placeholder="1234" />
                      <FormErrorMessage>{form.errors.OCMR}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Divider />
              <Stack spacing={1} >
                <Text>Housing Questionnaire</Text>
                <Text fontWeight="thin" fontSize="sm">Dining-only members need not fill this out.</Text>
              </Stack>
              <Field type="checkbox" name="comfortableWithAnyRoommate">
                {({ field }) => (
                  <Checkbox
                    {...field}
                    id="comfortableWithAnyRoommate"
                    name="comfortableWithAnyRoommate"
                  >
                    <Text textAlign="left">I am comfortable living with any roommate regardless of assigned sex or gender.</Text>
                  </Checkbox>
                )}
              </Field>
              <Divider />
              <Text>Coop Preference Ranking: </Text>
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
              <Field name="preferences[6]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="7">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[7]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="8">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[8]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="9">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[9]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="10">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="preferences[10]">
                {({ field, form }) => (
                  <FormControl>
                    <Select {...field} variant="outline" placeholder="11">
                      {choices.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Button
                alignSelf="center"
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                maxW="12rem"
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
