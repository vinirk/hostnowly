// External library imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Absolute imports
import App from 'app/App';
import { store } from 'app/store';
import reportWebVitals from 'reportWebVitals';
import { ToastProvider } from 'contexts/ToastContext';

// Style imports
import './styles/index.scss';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
