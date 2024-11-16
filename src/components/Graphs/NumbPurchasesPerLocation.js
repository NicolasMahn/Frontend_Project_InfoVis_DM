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

const NumbPurchasesPerLocation = ({filterSettings, onFilterChange}) => {
  const { loading, error, data } = useQuery(NUMB_PURCHASES_PER_LOCATION_QUERY, {
    fetchPolicy: 'cache-and-network', // Use cache first, then network
  });

  const [filteredData, setFilteredData] = useState([]);

  // Access CSS variables
  const possipbleColors = [
    getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--tertiary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--quaternary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--quinary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--senary-color').trim()
  ];

  useEffect(() => {
    if (data) {
      const filtered = data.numbPurchasesPerLocation
      .filter(data => filterSettings.locations.includes(data.location))
      .map(data => {
        const newData = { ...data };
        if (!filterSettings.categories.creditcard) {
          delete newData.numbPurchasesCc;
        }
        if (!filterSettings.categories.loyaltycard) { 
          delete newData.numbPurchasesLoyalty;
        }
        return newData;
      });
      setFilteredData(filtered);
    }
  }, [data, filterSettings]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort the data by the number of credit card purchases
  let sortedData = filteredData;
  if (filteredData.length > 0 && 'numbPurchasesCc' in filteredData[0] && filterSettings.sortCategory === 'creditcard') {
    sortedData = [...filteredData].sort((a, b) => b.numbPurchasesCc - a.numbPurchasesCc);
  } else if (filteredData.length > 0 && 'numbPurchasesLoyalty' in filteredData[0] && filterSettings.sortCategory === 'loyaltycard') {
    sortedData = [...filteredData].sort((a, b) => b.numbPurchasesLoyalty - a.numbPurchasesLoyalty);
  }

  // Prepare data for the BarChart component
  let y = [];
  let legend = [];
  let colors = [];
  if (filteredData.length > 0 && 'numbPurchasesCc' in filteredData[0]) {
    y.push(sortedData.map(d => d.numbPurchasesCc));
    legend.push("Credit Card Data");
    colors.push(possipbleColors[0]);
  }
  if (filteredData.length > 0 && 'numbPurchasesLoyalty' in filteredData[0]) {
    y.push(sortedData.map(d => d.numbPurchasesLoyalty));
    legend.push("Loyalty Card Data");
    colors.push(possipbleColors[1]);
  }
  if (y.length === 1) {
    y = y[0];
  }
  const chartData = {
    x: sortedData.map(d => d.location),
    y: y
  };
    
  const handleBarClick = (d) => {
    console.log("Bar clicked:", d);
  };

  const handleBarRightClick = (d) => {
    console.log("Bar right-clicked:", d);
    
    let locations  = filterSettings.locations
    delete locations[locations.indexOf(d.category)]
    onFilterChange({ locations: locations });
  };

  const handleBarDoubleClick = (d) => {
    console.log("Bar double-clicked:", d);
  };

  return (
    <div>
      <h2 className="header">Number of Purchases per Location</h2>
      <BarChart data={chartData} legend={legend} colors={colors} onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
  );
}

export default NumbPurchasesPerLocation;
