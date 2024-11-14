import React from 'react';
import { useQuery, gql } from '@apollo/client';

import BarChart from '../Charts/BarChart';

const NUMB_PURCHASES_PER_LOCATION_QUERY = gql`
  query NumbPurchasesPerLocation($locations: [String!]!) {
    numbPurchasesPerLocation(locations: $locations) {
      location
      numbPurchasesCc
      numbPurchasesLoyalty
    }
  }
`

const NumbPurchasesPerLocation = () => {
  const locations = [];

  const { loading, error, data } = useQuery(NUMB_PURCHASES_PER_LOCATION_QUERY, {
    variables: { locations },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort the data by the number of credit card purchases
  const sortedData = [...data.numbPurchasesPerLocation].sort((a, b) => b.numbPurchasesCc - a.numbPurchasesCc);

  // Prepare data for the BarChart component
  const chartData = {
    x: sortedData.map(d => d.location),
    y: [sortedData.map(d => d.numbPurchasesCc), sortedData.map(d => d.numbPurchasesLoyalty)]
  };

  return (
    <div>
      <h2 className="header">Number of Purchases per Location</h2>
      <BarChart data={chartData} />
    </div>
  );
}

export default NumbPurchasesPerLocation;
