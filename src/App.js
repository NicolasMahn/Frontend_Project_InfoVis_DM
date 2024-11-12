import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './services/api';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DashboardPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
