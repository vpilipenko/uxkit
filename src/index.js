import 'babel-polyfill'

import './assets/main.styl'
import './assets/margins.css'

import React from 'react'
import ReactDOM from 'react-dom'

import './setup'

import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('root'))
