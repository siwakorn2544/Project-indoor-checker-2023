import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore  } from 'redux'
import { BrowserRouter  } from "react-router-dom";
import { boxReducer } from './reducers/boxReducer';



const root = ReactDOM.createRoot(
  document.getElementById('root'));

const store = createStore(boxReducer)

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
);
