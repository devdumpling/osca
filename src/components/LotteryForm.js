import { Formik, Form, Field } from 'formik'
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage, Button, Input, Text, Heading, Stack, Center, Divider, Checkbox, Box
} from '@chakra-ui/react'
import SortableMultiSelect from './SortableMultiSelect'
import FormikOnSubmit from './FormikOnSubmit'

const LotteryForm = ({ countdown, onSubmit, currentEntryValues = {}, lottery }) => {
  // make a separate first year version or do some prop spreading
  const firstYear = true;

  // TODO make this dynamic and pull from GCP
  const choices = [
    'Harkness Housing & Dining',
    'Tank Housing & Dining',
    'Keep Housing & Dining',
    'Pyle Inn Dining-Only',
    'Third World Co-op Dining-Only',
    'Third World Co-op Dining and Third World Social Justice Housing',
  ];

  const startDate = new Date(lottery.start).toDateString();
  const endDate = new Date(lottery.end).toDateString();

  function validateName(value) {
    let error
    if (!value) {
      error = "Name is required"
    }
    return error
  }

  function validateTNumber(number) {
    const tNumberRegEx = /^\d{7,8}$/i

    let error
    if (!number) {
      error = "T-Number is required"
    } else if (!tNumberRegEx.test(number)) {
      error = "Invalid T Number. (Leave off the T) 😱" // is this 8 digits max?      
    }
    return error
  }

  function validateOCMR(ocmr) {
    const ocmrRegEx = /^\d{1,5}$/i

    let error
    if (!ocmr) {
      error = "OCMR is required"
    } else if (!ocmrRegEx.test(ocmr)) {
      error = "Invalid OCMR. (1-5 digits) 😱"
    }
    return error
  }

  function validatePhoneNumber(number) {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

    let error
    if (!number) {
      error = "Phone number is required"
    } else if (!phoneRegex.test(number)) {
      error = "Invalid phone number 😱"
    }
    return error
  }

  return (
    <Flex shadow="md" w="100%" borderRadius="lg" borderWidth="1px" direction="column" justifyContent="flex-start" mt={12} alignItems="center" pb={8}>
      <Center mb={4} p={4} w="100%" shadow="sm">
        <Stack textAlign="center" spacing={1}>
          <Heading>2021 First-Year Lottery</Heading>
          <Text color="gray.500" fontWeight="thin" m={2}>{countdown} remaining</Text>
        </Stack>
      </Center>
      <Stack textAlign="left" spacing={4} p={8} my={4}>
        <Text fontWeight="medium" fontSize="lg">
          The OSCA Lottery Process
        </Text>
        <Text>
          All Oberlin College students who wish to be in OSCA during Fall 2021 and/or Spring 2022 must fill out this lottery form.
        </Text>
        <Text>
          Each student’s entry will generate a random number which determines their rank in the lottery, ensuring all students have an equal chance at membership in a co-op.
          Under the recent lease with Oberlin College, this lottery and its resulting membership will determine the buildings OSCA is able to lease for the 2021-22 academic year.
        </Text>
        <Text fontWeight="medium">
          The lottery is open from {startDate} until {endDate}.
        </Text>
        <Text>
          For questions, comments, or concerns, email osca@oberlin.edu.
        </Text>
      </Stack>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          OCMR: "",
          tNumber: "",
          phoneNumber: "",
          country: "",
          state: "",
          city: "",
          addressLineOne: "",
          addressLineTwo: "",
          gender: "",
          genderComfortableWith: "",
          genderNotComfortableWith: "",
          comfortableWithAnyRoommate: true,
          interestedInAccessCo: false,
          preferences: [],
          ...currentEntryValues
        }}
        onSubmit={(values, actions) => {
          global.window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          onSubmit(values, actions)
        }}
      >
        {props => (
          <Box px="1rem" maxW="100%">
            <Form>
              <FormikOnSubmit>
                <Stack maxW="100%" spacing={6} p={2}>
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
                          <Input {...field} id="tNumber" placeholder="12345678" />
                          <FormErrorMessage>{form.errors.tNumber}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {!firstYear &&
                      <Field name="OCMR" validate={validateOCMR}>
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.OCMR && form.touched.OCMR}>
                            <FormLabel htmlFor="OCMR">OCMR</FormLabel>
                            <Input {...field} id="OCMR" placeholder="1234" />
                            <FormErrorMessage>{form.errors.OCMR}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    }
                  </Stack>
                  <Stack direction={["column", "row"]} spacing={2}>
                    <Field name="phoneNumber" validate={validatePhoneNumber}>
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}>
                          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                          <Input {...field} id="phoneNumber" placeholder="123-456-7890" />
                          <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="country">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="country">Country</FormLabel>
                          <Input {...field} id="country" placeholder="USA" />
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack direction={["column", "row"]} spacing={2}>
                    <Field name="city">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="city">City</FormLabel>
                          <Input {...field} id="city" placeholder="Oberlin" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="state">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="state">State</FormLabel>
                          <Input {...field} id="state" placeholder="OH" />
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack direction={["column", "row"]} spacing={2}>
                    <Field name="addressLineOne">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="addressLineOne">Address Line One</FormLabel>
                          <Input {...field} id="addressLineOne" placeholder="135 West Lorain" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="addressLineTwo">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="addressLineTwo">Address Line Two</FormLabel>
                          <Input {...field} id="addressLineTwo" placeholder="Apartment 2" />
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Divider />
                  <Stack spacing={1} >
                    <Text fontWeight="normal">Housing Questionnaire</Text>
                    <Text fontWeight="thin" fontSize="sm">Dining-only members need not fill this out.</Text>
                  </Stack>
                  <Field name="gender">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="gender">Gender</FormLabel>
                        <Input {...field} id="gender" placeholder="?" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="genderComfortableWith">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="genderComfortableWith">Gender(s) I'm comfortable living with</FormLabel>
                        <Input {...field} id="genderComfortableWith" placeholder="Leave blank for all" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="genderNotComfortableWith">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="genderNotComfortableWith">Gender(s) I'm NOT comfortable living with</FormLabel>
                        <Input {...field} id="genderNotComfortableWith" placeholder="Separate with semi-colons" />
                      </FormControl>
                    )}
                  </Field>
                  <Field type="checkbox" name="comfortableWithAnyRoommate">
                    {({ field }) => (
                      <Checkbox
                        {...field}
                        isChecked={field.value}
                        id="comfortableWithAnyRoommate"
                        colorScheme="teal"
                        name="comfortableWithAnyRoommate"
                      >
                        <Text textAlign="left">I am comfortable living with any roommate regardless of assigned sex or gender.</Text>
                      </Checkbox>
                    )}
                  </Field>
                  <Field type="checkbox" name="interestedInAccessCo">
                    {({ field }) => (
                      <Checkbox
                        {...field}
                        isChecked={field.value}
                        id="interestedInAccessCo"
                        colorScheme="teal"
                        name="interestedInAccessCo"
                      >
                        <Text textAlign="left">I would like to be contacted by an AccessCo about accessibility needs in OSCA.</Text>
                      </Checkbox>
                    )}
                  </Field>
                  <Divider />
                  <Stack spacing={1}>
                    <Text>Coop Preference Ranking: </Text>
                    <Text fontSize="sm">(Rank 1 is your top choice)</Text>
                    <Text fontSize="sm">(Click and drag to arrange your choices)</Text>
                  </Stack>
                  <Field name="preferences">
                    {({ field, form }) => (
                      <FormControl>
                        <SortableMultiSelect {...field} options={choices} onChange={selectedOptions => {
                          props.setFieldValue('preferences', selectedOptions)
                        }} />
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
              </FormikOnSubmit>
            </Form>
          </Box>
        )}
      </Formik>
    </Flex>
  )
}

export default LotteryForm
