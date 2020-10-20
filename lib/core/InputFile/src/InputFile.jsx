import cm from './InputFile.module.styl'

import React, { Component } from 'react'

import PropTypes from 'prop-types'
import cx from 'classnames'

import { findClosest, humanizeFileSize } from './utils'

import FileButton from './FileButton'
import FileList from './FileList'


class InputFile extends Component {

  static propTypes = {
    /**  String that describes a type of file that may be selected by the user. Example 'image/*,.pdf' */
    accept: PropTypes.string,
    /** String that specifies which camera to use for capture of image or video data */
    capture: PropTypes.string,
    /** ? */
    files: PropTypes.object,
    /** Ability to select multiple files to upload */
    multiple: PropTypes.bool,
    /** Ability to merge uploaded files */
    merge: PropTypes.bool,
    /** Upload button component */
    buttonComponent: PropTypes.func,
    /** Uploaded file component */
    fileListComponent: PropTypes.func,
    /** Sign that no files are currently uploaded */
    signNoFiles: PropTypes.string,

    /** Size limit for single file in bytes */
    maxFileSize: PropTypes.number,
    /** Size limit for multiple file in bytes */
    maxFilesSize: PropTypes.number,
    /** Max file size error. Func return uploaded file size. */
    maxFileSizeError: PropTypes.func,
    /** Max file stack size error. Func return size of all file stack. */
    maxFilesSizeError: PropTypes.func,

    /** Hint under upload button */
    hint: PropTypes.string,

    /** On field change handler */
    onChange: PropTypes.func,
    /** On file item click handler */
    onFileClick: PropTypes.func,
  }

  static defaultProps = {
    multiple: false,
    merge: false,
    signNoFiles: '',
  }


  state = {
    fileList: [],
    error: '',
  }


  handleFileListClick = e => {
    const { name, onFileClick, onChange, disabled } = this.props

    if (disabled) { return }

    const el = e.target

    const fileEl = findClosest(el, '[data-fileindex]')
    const delEl = findClosest(el, '[data-deleteindex]')

    const fileIndex = fileEl && fileEl.dataset && fileEl.dataset.fileindex
    const delIndex = delEl && delEl.dataset && delEl.dataset.deleteindex

    if (fileIndex) {
      onFileClick && onFileClick(fileEl, fileIndex)
    }

    if (delIndex) {
      const fileList = this.state.fileList.filter((F, index) => index !== +delIndex)
      this.setState({ fileList, error: '' })
      onChange && onChange({ target: { name, value: fileList } })
    }
  }


  handleInputChange = e => {
    const {
      onChange,
      merge,
      maxFileSize,
      maxFileSizeError,
      maxFilesSize,
      maxFilesSizeError,
    } = this.props

    const { fileList } = this.state

    const { name, files } = e.target


    let newFileList = []
    let newFileListSize = 0

    if (merge) {
      newFileList = [...fileList]
      fileList.map(F => newFileListSize = newFileListSize + F.size)
    }

    this.setState({ error: '' })

    // eslint-disable-next-line
    for (let index = 0; index < files.length; index++) {
      const File = files[index]

      newFileList.push(File)
      newFileListSize = newFileListSize + File.size
      if (maxFileSize && File.size > maxFileSize) {
        let error = `Максимальный размер одного файла ${humanizeFileSize(maxFileSize)}`
        if (typeof maxFileSizeError === 'function') {
          error = maxFileSizeError({ size: File.size })
        }
        return this.setState({ error })
      }
    }

    e.target.value = ''

    if (maxFilesSize && newFileListSize > maxFilesSize ) {
      let error = `Максимальный размер загружаемых файлов ${humanizeFileSize(maxFilesSize)}`
      if (typeof maxFilesSizeError === 'function') {
        error = maxFilesSizeError({ size: newFileListSize })
      }
      return this.setState({ error })
    }

    onChange && onChange({ target: { name, value: newFileList } })

    this.setState({ fileList: newFileList })
  }

  handleButtonClick = e => {
    this.inputRef.click()
  }

  handleInputRef = node => {
    this.inputRef = node
  }

  render() {
    const {
      name,
      inline,
      buttonComponent,
      accept,
      capture,
      multiple,
      hint,
      fileListComponent,
      signNoFiles,
      buttonText,
      disabled,
    } = this.props

    const { error, fileList } = this.state

    return (
      <div className={cx({
        [cm.input_file]: true,
        [cm.inline]: inline,
      })}>
        <FileButton
          name={name}
          buttonComponent={buttonComponent}
          buttonText={buttonText}
          disabled={disabled}
          accept={accept}
          capture={capture}
          multiple={multiple}
          hint={hint}
          error={error}
          inputRef={this.handleInputRef}
          onClick={this.handleButtonClick}
          onChange={this.handleInputChange}
        />
        <FileList
          fileList={fileList}
          fileListComponent={fileListComponent}
          signNoFiles={signNoFiles}
          disabled={disabled}
          onClick={this.handleFileListClick}
        />
      </div>
    )
  }
}

export default InputFile


