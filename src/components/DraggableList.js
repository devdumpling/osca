import SpringList from 'react-spring-dnd'
import { Flex } from '@chakra-ui/react'

export default function DraggableList({ items }) {
  return (
    <Flex justify="center" align="center" my={8}>
      <SpringList>
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </SpringList>
    </Flex>
  )
}
