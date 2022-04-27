import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
import { TransactionProvider } from './context/TransactionContext';

ReactDOM.render(
  <TransactionProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TransactionProvider>,
  document.getElementById('root')
)

//after wrapping with TransactionProvider, now the app can access any data that is passed into it --> value prop in TransactionContext.jsx
