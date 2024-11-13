import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './services/api';
import Dashboard from './components/Dashboard';
import ExamplePage from './pages/ExamplePage';

import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Dashboard />
      </div>
      <div className="App">
        <ExamplePage />
      </div>
    </ApolloProvider>
  );
}

export default App;
