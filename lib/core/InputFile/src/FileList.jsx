import cm from './InputFile.module.styl'

import React, { Component } from 'react'

import { humanizeFileSize } from './utils'

const IconButton = require('@vpilipenko/icon-button')
require('@vpilipenko/icon-button/dist/styles.css')

const { Delete } = require('@vpilipenko/icons')


class FileList extends Component {
  render() {
    const {
      signNoFiles,
      fileListComponent,
      fileList,
      onClick,
    } = this.props

    if (!fileList || !fileList.length) { return signNoFiles ? signNoFiles : null }

    return (
      <div className={cm.file_list} onClick={onClick}>
        {fileList.map((File, index) => {
          let Component = (
            <div
              className={cm.file}
              data-fileindex={index}
              key={index}
            >
              <IconButton data-deleteindex={index}>
                <Delete fill='#FF1744' />
              </IconButton>
              <div className={cm.details}>
                <div className={cm.name}>{File.name}</div>
                <div className={cm.size}>{humanizeFileSize(File.size)}</div>
              </div>
            </div>
          )

          if (typeof fileListComponent === 'function') {
            Component = fileListComponent({ File, index })
          }

          return Component
        })}
      </div> )
  }
}

export default FileList