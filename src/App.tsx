import React from 'react';
import { Provider } from 'react-redux';
import Main from './pages/main';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
