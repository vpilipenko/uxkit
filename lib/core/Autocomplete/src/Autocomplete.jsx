import React, { Component, useRef, useState, useCallback, useEffect } from 'react'
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

let blurTimer = -1

const Autocomplete = ({
  query = '',
  options = [],
  focusIndex = -1,
  onFocusChange = e => { },
  onChange = p => { },
  onQuery = q => q,
  isLoading = false,
  autoSelectFirstItem = false,
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
  groupBy = l => l,
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
  name = '',
  isMultiple = false,
  ...other
}) => {

  const containerRef = useRef(null)

  const [internalOptions, setInternalOptions] = useState(options || [])

  const [internalValue, setInternalValue] = useState(
    isMultiple 
      ? (value ? value : [])
      : (
        (typeof value === 'string' || typeof value === 'number')
          ? internalOptions.find(o => getValue(o) === value)
          : value || defaultValue
      )
  )

  const [internalInputValue, setInternalInputValue] = useState(
    isMultiple 
      ? ('')
      : (
        (typeof value === 'string' || typeof value === 'number')
          ? (internalOptions.find(o => getValue(o) === value) || {})[labelKey] || ''
          : (value || '')
      )
  )

  const [internalInputPlaceholder, setInternalInputPlaceholder] = useState('')
  const [internalFocusIndex, setInternalFocusIndex] = useState(focusIndex)
  const [isInputFocused, setInputFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(defaultOpen)


  const inputValueUpdate = useCallback((value) => {
    if (typeof value === 'string') {
      setInternalInputValue(value)
      return
    }
    if (isMultiple) {
      setInternalInputValue('')
    } else {
      setInternalInputValue(getLabel(internalValue) || "")
    }
  }, [isMultiple, internalValue])

  const handleSelectOption = useCallback(() => {
    setInternalValue(prev => {
      const opt = internalOptions[internalFocusIndex]
      const optValue = getValue(opt)
      if (isMultiple) {
        const isSet = prev.find(o => getValue(o) === optValue)
        if (isSet) {
          return prev.filter(o => getValue(o) !== optValue)
        }
        return [...prev, opt]
      }
      return opt
    })
  }, [isMultiple, internalOptions, internalFocusIndex])

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
    // setIsOpen(false)
    onBlur(e)
  }, [internalValue])

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
          handleSelectOption()
          return
      }
    }
  }, [isOpen, isInputFocused, internalOptions, internalFocusIndex])

  const handleClick = useCallback(e => {
    let { target } = e
    while (target && target !== containerRef.current) {
      const { dataset } = target
      if (dataset && dataset.index !== undefined) {
        e.preventDefault()
        e.stopPropagation()
        const { index } = dataset
        handleSelectOption()
        return
      }
      target = target.parentNode
    }

    if (target && target === containerRef.current) {
      // 
    } else {
      setIsOpen(false)
    }

  }, [internalOptions, internalFocusIndex])

  useEffect(() => {
    !isOpen && internalValue && inputValueUpdate()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }, [isOpen])

  useEffect(() => {
    setInternalValue(
      isMultiple ? (
        []
      ) : (
        (value && (typeof value === 'string' || typeof value === 'number'))
        ? internalOptions.find(o => getValue(o) === value)
        : value
      )
    )
    setInternalValue(value ? (
      (typeof value === 'string' || typeof value === 'number')
        ? internalOptions.find(o => getValue(o) === value)
        : value
    ) : isMultiple ? [] : null)
  }, [value])

  useEffect(() => {
    setInternalInputValue(query)
  }, [query])

  useEffect(() => {
    setInternalFocusIndex(focusIndex)
  }, [focusIndex])

  useEffect(() => {
    setInternalOptions(
      (options || [])
        .filter((o, i) => filter(internalInputValue, o, i))
        .sort(sort)
      //  groupBy .....
    )
  }, [options, internalInputValue])

  useEffect(() => {
    onChange({
      target: {
        name,
        value: internalValue,
      }
    })
  }, [name, internalValue])

  useEffect(() => {
    if(!isMultiple) {
      internalValue && inputValueUpdate() //setInternalInputValue(getLabel(internalValue))
    }
  }, [internalValue, isMultiple])


  useEffect(() => {
    if(!isMultiple) {
      !internalInputValue && setInternalValue(null)
    }
  }, [internalInputValue, isMultiple])

  const isEmpty = !internalOptions.length

  return (
    <div ref={containerRef} onClick={handleClick}>
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
                  const optionLabel = getLabel(option)
                  const optionValue = getValue(option)
                  const isChecked = isMultiple ? (
                    value && !!value.find(o => getValue(o) === optionValue)
                  ) : (
                    value && getValue(value) === optionValue
                  )
                  return (
                    <div
                      data-value={optionValue}
                      data-index={index}
                      key={index}
                    >
                      <MenuItem
                        size='m'
                        focused={isFocusedOption}
                        active={isChecked}
                        onMouseEnter={() => setInternalFocusIndex(index)}

                      >
                        {optionLabel} / {optionValue}
                      </MenuItem>
                    </div>
                  )
                })}
            </Menu>
          </If>
        </If>
      </div>

      <If condition={isOpen || isInputFocused}>
        <EventListener target='window' onKeyDown={handleKeyDown} />
      </If>

      <If condition={isOpen}>
        <EventListener target='window' onClick={handleClick} />
      </If>
    </div>
  )
}

export default Autocomplete
