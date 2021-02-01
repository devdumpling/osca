import React from 'react'

import Select, { components } from 'react-select'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { useColorMode } from '@chakra-ui/react'

function arrayMove(array, from, to) {
  array = array.slice()
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0])
  return array
}

const SortableMultiValue = SortableElement(props => {
  // this prevents the menu from being opened/closed when the user clicks
  // on a value to begin dragging it. ideally, detecting a click (instead of
  // a drag) would still focus the control and toggle the menu, but that
  // requires some magic with refs that are out of scope for this example
  const onMouseDown = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const innerProps = { onMouseDown }
  return <components.MultiValue {...props} innerProps={innerProps} />
})

const SortableSelect = SortableContainer(Select)

export default function MultiSelectSort({ options = [], value = {}, onChange }) {
  // For colorMode
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }
  const color = { light: 'black', dark: 'white' }

  const implicitLabels = Array.isArray(options)
  options = implicitLabels ? valuesAsLabels(options) : options
  value = implicitLabels ? valuesAsLabels(value) : value

  const [selected, setSelected] = React.useState(value)

  const handleChange = selectedOptions => {
    setSelected(selectedOptions)
    onChange(implicitLabels ? valuesFromOptions(selectedOptions) : selectedOptions)
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const selectedOptions = arrayMove(selected, oldIndex, newIndex)
    setSelected(selectedOptions)
    onChange(implicitLabels ? valuesFromOptions(selectedOptions) : selectedOptions)
  }

  return (
    <SortableSelect
      // react-sortable-hoc props:
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      // react-select props:
      isMulti
      options={options}
      value={selected}
      onChange={handleChange}
      components={{
        MultiValue: SortableMultiValue,
      }}
      closeMenuOnSelect={false}
      styles={{
        multiValue: (style, state) => ({
          ...style,
          color: color[colorMode],
          justifyContent: 'space-between',
          padding: '1rem',
          marginTop: '0.25rem',
          marginBottom: '0.25rem',
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 25%)',
          width: '100%'
        }),
        // input: (style, state) => ({
        //   display: state.isFocused 'none'
        // }),
        valueContainer: (style, state) => ({
          ...style,
          backgroundColor: bgColor[colorMode],
          flexDirection: 'column'
        })
      }}
    />
  )
}

function valuesAsLabels(values) {
  return values.map((value, i) => ({ value, label: i + '. ' + value }))
}

function valuesFromOptions(options) {
  return options.map(({ value }) => value)
}