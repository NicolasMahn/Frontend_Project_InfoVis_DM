import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import BarChart from '../Charts/BarChart';

const NUMB_PURCHASES_PER_LOCATION_QUERY = gql`
  query NumbPurchasesPerLocation {
    numbPurchasesPerLocation {
      location
      numbPurchasesCc
      numbPurchasesLoyalty
    }
  }
`

const NumbPurchasesPerLocation = ({filterSettings}) => {
  const { loading, error, data } = useQuery(NUMB_PURCHASES_PER_LOCATION_QUERY, {
    fetchPolicy: 'cache-and-network', // Use cache first, then network
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      const filtered = data.numbPurchasesPerLocation.filter(locationData =>
        filterSettings.locations.includes(locationData.location)
      );
      setFilteredData(filtered);
    }
  }, [data, filterSettings.locations]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort the data by the number of credit card purchases
  const sortedData = [...filteredData].sort((a, b) => b.numbPurchasesCc - a.numbPurchasesCc);

  // Prepare data for the BarChart component
  const chartData = {
    x: sortedData.map(d => d.location),
    y: [sortedData.map(d => d.numbPurchasesCc), sortedData.map(d => d.numbPurchasesLoyalty)]
  };
    
  const handleBarClick = (d) => {
    console.log("Bar clicked:", d);
  };

  const handleBarRightClick = (d) => {
    console.log("Bar right-clicked:", d);

    
  };

  const handleBarDoubleClick = (d) => {
    console.log("Bar double-clicked:", d);
  };

  return (
    <div>
      <h2 className="header">Number of Purchases per Location</h2>
      <BarChart data={chartData} onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
  );
}

export default NumbPurchasesPerLocation;
