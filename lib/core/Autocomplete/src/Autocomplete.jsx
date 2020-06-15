import React, { Component, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import EventListener from 'react-event-listener'
import isHotkey from 'is-hotkey'

import Input from '@vpilipenko/input'
require('@vpilipenko/input/dist/styles.css')

import Menu from '@vpilipenko/menu'
require('@vpilipenko/menu/dist/styles.css')

import MenuItem from '@vpilipenko/menu-item'
require('@vpilipenko/menu-item/dist/styles.css')


const isDown = isHotkey('down')
const isUp = isHotkey('up')
const isLeft = isHotkey('left')
const isRight = isHotkey('right')
const isEsc = isHotkey('esc')
const isEnter = isHotkey('enter')

const Autocomplete = ({
  query = '',
  options = [],
  focusIndex = -1,
  onFocusChange = e => { },
  onChange = p => { },
  onQuery = q => q,
  isLoading = false,
  autoSelectFirstItem = false,
  chips = false,
  filter = o => true,
  sort = (a, b) => a > b ? 1 : -1,
  value = null,
  labelKey = 'label',
  valueKey = 'id',
  getLabel = o => o[labelKey],
  getValue = o => o[valueKey],
  className,
  classNames = {},
  optionComponent = 'div',
  renderOption = null,
  groupBy = null,
  onClear = () => { },
  onOpen = () => { },
  onClose = () => { },
  onDelete = (o, i) => { },
  focusChipBeforeDelete = false,
  ellipsis = true,
  renderChip = () => { },
  autoFocus = false,
  renderFooter = null,
  maxVisibleOptions = 100,
  renderEmpty = () => 'empty',
  renderLoading = () => 'loading',
  onFocus = e => { },
  onBlur = e => { },
  defaultOpen = false,
  defaultValue = null,
  ...other
}) => {
  const [internalOptions, setInternalOptions] = useState(options || [])
  const [internalValue, setInternalValue] = useState(value || defaultValue)
  const [internalInputValue, setInternalInputValue] = useState(query)
  const [internalInputPlaceholder, setInternalInputPlaceholder] = useState('')
  const [internalFocusIndex, setInternalFocusIndex] = useState(focusIndex)


  const [isInputFocused, setInputFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleSelectOption = useCallback(option => {
    onChange(option)
  }, [])

  const handleInputChange = useCallback(e => {
    const { value } = e.target
    setInternalInputValue(value)
  }, [])

  const handleFocus = useCallback(e => {
    setInputFocused(true)
    setIsOpen(true)
    onFocus(e)
  }, [])

  const handleBlur = useCallback(e => {
    setInputFocused(false)
    setIsOpen(false)
    onBlur(e)
  }, [])

  const handleKeyDown = useCallback(e => {
    if (isInputFocused) {
      switch (true) {
        case isDown(e):
          setIsOpen(true)
          break
      }
    }
    if (isOpen) {
      switch (true) {
        case isUp(e):
          return setInternalFocusIndex(p => --p < 0 ? options.length - 1 : p)
        case isDown(e):
          setInternalFocusIndex(p => ++p % options.length)
          return
        case isEsc(e):
          return setIsOpen(false)
        case isEnter(e):
          return //
      }
    }
  }, [isOpen, isInputFocused])

  useEffect(() => {
    isOpen && onOpen()
    !isOpen && onClose()
  }, [isOpen])

  useEffect(() => {
    setInternalValue(value)
  }, [value])


  useEffect(() => {
    setInternalInputValue(query)
  }, [query])

  useEffect(() => {
    setInternalFocusIndex(focusIndex)
  }, [focusIndex])

  useEffect(() => {
    setInternalOptions(
      options
      .filter((o, i) => filter(internalInputValue, o, i))
      .sort(sort)
    )
  }, [options, sort, filter])

  const isEmpty = !options || !options.length

  return (
    <div>
      <pre>
        {JSON.stringify({ isEmpty, isInputFocused })}
      </pre>
      <div>
        Wrapper <button onClick={e => setIsOpen(true)}>asd</button>
      </div>
      <div>

        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={internalInputValue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <If condition={isLoading}>
          {renderLoading()}
        </If>
        <If condition={!isLoading}>
          <If condition={isEmpty}>
            {renderEmpty()}
          </If>
          <If condition={!isEmpty && isOpen}>
            <Menu>
              aaaa
              {internalOptions
                .map((option, index) => {
                  const isFocusedOption = internalFocusIndex === index
                  const label = getLabel(option)
                  const value = getValue(option)
                  return (
                    <MenuItem
                      key={index}
                      size='m'
                      focused={isFocusedOption}
                    >
                      {label} / {value}
                    </MenuItem>
                  )
                })}
            </Menu>
          </If>
        </If>
      </div>

      <If condition={isOpen || isInputFocused}>
        <EventListener target='window' onKeyDown={handleKeyDown} />
      </If>
    </div>
  )
}

export default Autocomplete

//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
//     value: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//     onFocusChange: PropTypes.func,
//     onChange: PropTypes.func,
//     isLoading: PropTypes.bool,
//     autoSelectFirstItem: PropTypes.bool,
//     chips: PropTypes.bool
//   }

//   static defaultProps = {
//     query: '',
//     options: [],
//     focusIndex: -1,
//     onFocusChange: e => {},
//     onChange: p => {},
//     isLoading: false,
//     autoSelectFirstItem: false,
//     chips: false,
//     filter: o => o,
//     sort: (a, b) => a > b ? 1 : -1,
//     value: null,
//     labelKey: 'label',
//     valueKey: 'id',
//     getLabel: o => o[labelKey],
//     getValue: o => o[valueKey],
//     // className,
//     classNames: {},
//     optionComponent: 'div',
//     renderOption: null,
//     groupBy: null,
//     onClear: () => {},
//     onDelete: (o, i) => {},
//     focusChipBeforeDelete: false,
//     ellipsis: true,
//     renderChip: () => {},
//     autoFocus: false,
//     renderFooter: null,
//     maxVisibleOptions: 100,
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           wrapper
//         </div>
//         <div>
//         </div>
//         <div>
//           menu
//         </div>
//       </div>
//     )
//   }
// }




// export default Autocomplete
