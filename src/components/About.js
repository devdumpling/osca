import {
  Heading,
  Flex,
  Text,  
  VStack
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { InlineText, InlineForm } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'

import { Container } from './Container'

const About = ({ data={}, form={} }) => (
  <Container mb='8rem' textAlign='left'>
    <InlineForm form={form}>
      <Flex wrap='wrap'>
        <VStack spacing={8} mx={4}>
          <Heading mb={2}>
            <InlineText name="title">{data.title || ''}</InlineText>
          </Heading>
            <InlineWysiwyg name="body" format="markdown">
              <Text fontSize='lg'>
                <ReactMarkdown source={data.body} />
              </Text>
            </InlineWysiwyg>
        </VStack>
      </Flex>
    </InlineForm>
    <style jsx>{`
      p {
        margin-bottom: 1rem !important;
      }
    `}</style>
  </Container>
)

export default About
