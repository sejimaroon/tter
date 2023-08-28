import React from 'react';
import './App.css';
import { store } from "./store.js";
import { Provider } from 'react-redux';
import { Routers } from "./Routers"

export function App() {
  
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}

export default App;
