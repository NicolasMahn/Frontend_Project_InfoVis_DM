import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TEST_QUERY = gql`
  query {
    people {
      name
      age
    }
  }
`

const ExamplePage = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Getting Test Collection</h1>
      {data.people.map((person) => (
        <div key={person.name}>
          <p>Name: {person.name}</p>
          <p>Age: {person.age}</p>
        </div>
      ))}
    </div>
  );
};

export default ExamplePage;
