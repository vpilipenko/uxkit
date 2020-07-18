import React, { Fragment, Component, useRef, useState, useCallback, useEffect, useMemo } from 'react'

import EventListener from 'react-event-listener'
import isHotkey from 'is-hotkey'
const { usePopper } = require('react-popper')

import Input from '@vpilipenko/input'
require('@vpilipenko/input/dist/styles.css')

import Menu from '@vpilipenko/menu'
require('@vpilipenko/menu/dist/styles.css')

import MenuItem from '@vpilipenko/menu-item'
require('@vpilipenko/menu-item/dist/styles.css')

import Portal from './Portal'

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
  filter = (query, obj, index) => {
    const h = obj[labelKey].toLowerCase()
    const n = query.toLowerCase() // const n = query ? query.toLowerCase() : -1
    return h.indexOf(n) > -1
  },
  sort = (a, b) => a > b ? 1 : -1,
  value = null,
  labelKey = 'label',
  valueKey = 'id',
  getLabel = o => o[labelKey],
  getValue = o => o[valueKey],
  className,
  classNames = {},
  optionComponent = MenuItem,
  renderOption = null,
  onClear = () => { },
  onOpen = () => { },
  onClose = () => { },
  onDelete = (o, i) => { },
  focusChipBeforeDelete = false,
  ellipsis = true,
  renderChip = () => { },
  autoFocus = false,
  renderFooter = null,
  renderEmpty = () => 'empty',
  renderLoading = () => 'loading',
  onFocus = e => { },
  onBlur = e => { },
  defaultOpen = false,
  defaultValue = null,
  name = '',
  isMultiple = false,
  usePortal = true,
  portalTarget = document.body,
  disabled = false,
  size = 'm',
  groupBy = '',
  renderGroupSubheader = null,
  maxVisibleOptions = 10,
  fullWidth = false,
  maxOptionsHeight = 300,
  ...other
}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

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
    onQuery(value)
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
    setInternalOptions((options || [])
    .filter((o, i) => filter(internalInputValue, o, i))
    .sort(sort))
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


  const getOption = (option, index) => {
    const optionValue = getValue(option)
    const optionLabel = getLabel(option)
    const isFocusedOption = internalFocusIndex === index
    const isChecked = isMultiple
      ? (value && !!value.find(o => getValue(o) === optionValue))
      : (value && getValue(value) === optionValue)

    
    if (typeof renderOption === 'function') {
      return renderOption(option, index, internalOptions, isFocusedOption, isChecked, optionComponent)
    }

    const OptionComponent = optionComponent

    return (
      <OptionComponent
        size={size}
        focused={isFocusedOption}
        active={isChecked}
      >
        {optionLabel}
      </OptionComponent>
    )
  }

  const getGroupSubheader = (subheader) => {
    if (typeof renderGroupSubheader === 'function') {
      return renderGroupSubheader(subheader)
    }
    return <div>{subheader}</div>
  }

  const getOptions = () => {
    let curGroup
    return (
      <Menu size={size} maxHeight={maxOptionsHeight}>
        {internalOptions
          .map((option, index) => {
            const optionValue = getValue(option)
            let groupSubheader
            if (groupBy) {
              const gv = option[groupBy]
              if (curGroup !== gv) {
                curGroup = gv
                groupSubheader = gv
              }
            }
            return (
              <Fragment key={index}>
                <If condition={groupSubheader}>
                  {getGroupSubheader(groupSubheader)}
                </If>
                <div
                  data-value={optionValue}
                  data-index={index}
                  onMouseEnter={() => setInternalFocusIndex(index)}
                >
                  {getOption(option, index)}
                </div>
              </Fragment>
            )
          })}
      </Menu>
    )
  }


  const isEmpty = !internalOptions.length

  const sameWidth = useMemo(() => ({
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      state.elements.popper.style.width = `${
        state.elements.reference.offsetWidth
      }px`;
    }
  }), [])
  
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [sameWidth]
  })

  const UsePortal = usePortal ? Portal : 'div'
  const portalProps = portalTarget ? {target: portalTarget} : {}

  return (
    <div ref={containerRef} onClick={handleClick}>
      <Input
        name={name}
        inputRef={setReferenceElement}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={internalInputValue}
        onChange={handleInputChange}
        disabled={disabled}
        size={size}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
      />
      <div>
        <If condition={isLoading}>
          {renderLoading()}
        </If>
        <If condition={!isLoading}>
          <If condition={isEmpty}>
            {renderEmpty()}
          </If>
          <If condition={!isEmpty && isOpen}>
            <UsePortal {...portalProps}>
              <div ref={setPopperElement} style={{zIndex: 1, ...popperStyles.popper}} {...popperAttributes.popper}>
                {getOptions()}
              </div>
            </UsePortal>
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
