import React from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from './apolloClient';

const GET_COMBINED_DATA = gql`
  query GetCombinedData {
    combinedData {
      data1
      data2
      data3
    }
  }
`;

const CombinedDataComponent = () => {
  const { loading, error, data } = useQuery(GET_COMBINED_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Combined Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <CombinedDataComponent />
  </ApolloProvider>
);

export default App;