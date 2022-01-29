/* eslint-disable react/no-unescaped-entities */
import Meta from "../components/Meta";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import Header from "../components/Header";

import {
  Heading,
  Text,
  Link,
  Box,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

const Index = () => {
  return (
    <>
      <Meta title="FAQ" description="OSCA Frequently Asked Questions page" />
      <Header />
      <Container>
        <Main mb={4}>
          <Heading mt={2}>Frequently Asked Questions</Heading>
          <Box>
            <UnorderedList>
              <ListItem>
                <Link color="teal.500" href="#">
                  <Text>
                    What is the Oberlin Student Cooperative Association (OSCA)?
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#what-is-osca">
                  <Text>Why should I join OSCA?</Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#why-should-i-join-osca">
                  <Text>How do I sign up?</Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#how-do-i-sign-up">
                  <Text>Will I save money by being in OSCA?</Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#will-i-save">
                  <Text>Who owns these buildings?</Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#who-owns-these-buildings">
                  Why have OSCA costs changed?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#why-osca-costs-changed">
                  What happened to Fairkid, Brown Bag, and Old B?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#what-happened-to-fairkid">
                  How to pay?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#how-to-pay">
                  Are there different ways to pay my OSCA bill? What options do
                  I have if I cannot pay the entire amount up front?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#different-way-pay">
                  Can I switch out of OSCA?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#different-way-pay">
                  Can I go abroad if I'm in OSCA?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#different-way-pay">
                  Can I switch into other co-ops still?
                </Link>
              </ListItem>
              <ListItem>
                <Link color="teal.500" href="#different-way-pay">
                  I'm in OSCA dining. Can I switch into OSCA housing and dining?
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Flex
            flexDirection="column"
            alignSelf="center"
            p={4}
            borderWidth="1px"
            borderRadius="1rem"
            gridGap="2rem"
          >
            <Box id="what-is-osca">
              <Heading mb={4}>What is OSCA?</Heading>
              <Text>
                The Oberlin Student Cooperative Association is a student-run,
                non-profit corporation that feeds around four hundred Oberlin
                students. Our co-ops provide at-cost housing and dining to
                members, and work to provide inexpensive, healthy, tasty, and
                environmentally-wise meals. Our organization aims to buy food
                based on principles of accessibility, sustainability, and
                supporting fair labor practices. Our co-ops and the wider
                organization engages in decision-making through modified
                consensus, and OSCA is one of the largest cooperatives in North
                America.
              </Text>
            </Box>
            <Box id="why-should-i-join-osca">
              <Heading mb={4}>Why should I join OSCA?</Heading>
              <Text>
                Community! Good food! History! Consensus! Life skills and
                training. Come to a meal or check out the co-op descriptions to
                find out more.
              </Text>
            </Box>
            <Box id="how-do-i-sign-up">
              <Heading mb={4}>How do I sign up?</Heading>
              <Text>
                Right now there are 2 ways to join OSCA! Before the end of the
                fall 2021 semester, you can join OSCA dining for spring 2022 by
                signing up for the waitlist{" "}
                <Link
                  color="teal.500"
                  isExternal
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeCqQg_b_80WbWzFKsWpSQcNeoTBmpte_EQXCHFqaDxLlnrag/viewform?usp=sf_link"
                >
                  HERE
                </Link>
                . To join OSCA for 2022-2023, sign up for the lottery when it is
                announced in January.
              </Text>
            </Box>
            <Box id="will-i-save">
              <Heading mb={4}>Will I save money by being in OSCA?</Heading>
              <Text>
                It depends on your financial aid package. Email us and talk to
                student accounts if you have questions. OSCA’s membership fees
                are less than College Dining Services (CDS)/ResEd prices, but
                this may not equate to personal savings, depending on what aid
                you receive. Please reach out to us if you’d like to talk about
                your specific situation.
              </Text>
            </Box>
            <Box id="who-owns-these-buildings">
              <Heading mb={4}>
                Who owns these buildings? What is OSCA’s relationship to the
                college?
              </Heading>
              <Text>
                OSCA is an independent nonprofit organization that rents the
                spaces it operates from Oberlin College. OSCA currently rents 3
                housing and 5 dining spaces from the college. OSCA and Oberlin
                College negotiate their lease agreement every 5 years. Everyone
                in OSCA is an Oberlin College student, so there is much overlap
                between OSCA and Oberlin College, but we are separate
                organizations.
              </Text>
            </Box>
            <Box id="why-osca-costs-changed">
              <Heading mb={4}>
                Why have OSCA costs changed so much this year (as a result of
                the 2020 lease)?
              </Heading>
              <Text>
                In 2020, OSCA and Oberlin College signed a new lease. Unlike in
                previous years where rent was charged a fixed dollar amount each
                year, OSCA’s rent is now determined by an “exemption fee” for
                each student. The lease specifies that the exemption fee for
                housing is 89% of the college’s room rate, for each student. For
                dining, the exemption fee is 42% of the Gold meal plan, per
                student. This has resulted in OSCA having to raise prices in
                order to pay rent, especially for housing.
              </Text>
            </Box>
            <Box id="what-happened-to-fairkid">
              <Heading mb={4}>
                What happened to Fairkid, Brown Bag, and Old B?
              </Heading>
              <Text>
                The college will no longer lease the Fairkid basement to OSCA,
                as they want to use it for AVI. Brown Bag and Old B will be
                available based on interest -- so make sure you put these high
                on your lottery preferences if you are interested! In some
                years, such as 2021-2022, there were not enough interest in
                these coops to be able to afford to open them.
              </Text>
            </Box>
            <Box id="how-to-pay">
              <Heading mb={4}>How to pay your OSCA Bill?</Heading>
              <Text>
                OSCA's preferred method of payment is a mailed check to:
                <Text>
                  <br />
                  Oberlin Student Cooperative Association
                  <br />
                  P.O. Box 118
                  <br />
                  Oberlin, OH 44074
                </Text>
                <br />
                Or, if you have already paid your Oberlin College Bill, pay the
                sum of your OSCA bill to Oberlin College's Office of Student
                Accounts and submit this form to request that the balance be cut
                into a check and sent on to OSCA. This method holds no extra
                fees, but requires that you have already paid your Oberlin
                College bill.
              </Text>
            </Box>
            <Box id="different-way-pay">
              <Heading mb={4}>
                Are there different ways to pay my OSCA bill? What options do I
                have if I cannot pay the entire amount up front?
              </Heading>
              <Text>
                <UnorderedList>
                  <ListItem>
                    <Text>
                      <strong>Payment plan</strong> -- email osca@oberlin.edu to
                      request a payment plan
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text>
                      <strong>Need-based scholarship</strong> -- these
                      applications will be available the first week of classes.
                      If you have questions please contact osca@oberlin.edu
                    </Text>
                  </ListItem>
                </UnorderedList>
              </Text>
            </Box>
            <Box id="can-i-switch">
              <Heading mb={4}>Can I switch out of OSCA?</Heading>
              <Text>
                After the deadline to announce you want to be released, you will
                not be refunded for being released from OSCA and, if you are not
                exempt from a meal plan, CDS will charge you a prorated amount
                for the rest of the semester. So, yes, you can be released at
                any time, but it is preferable if you make these decisions by
                the deadline to avoid being doubly charged.
              </Text>
            </Box>
            <Box id="abroad">
              <Heading mb={4}>Can I go abroad if I'm in OSCA?</Heading>
              <Text>
                Yes, you can still go abroad. We cannot guarantee that we will
                be able to fill your spot, and it is possible that you may still
                be financially liable for your housing spot. We will work hard
                to prevent this from happening.
              </Text>
            </Box>
            <Box id="switch-coops">
              <Heading mb={4}>Can I switch into other co-ops still?</Heading>
              <Text>
                Yes! Internal changes can happen at any time. You will not be
                notified of dining changes, but you will be asked before making
                housing changes.
              </Text>
            </Box>
            <Box id="switch-coops-2">
              <Heading mb={4}>
                I’m in OSCA dining. Can I switch into OSCA housing and dining?
              </Heading>
              <Text>
                We cannot make changes to housing assignments outside of the
                spring and summer lotteries if you are housed by ResEd. If you
                are off-campus, you can joining OSCA housing.
              </Text>
            </Box>
          </Flex>
        </Main>
        <Footer />
        <CTA />
      </Container>
    </>
  );
};

export default Index;
