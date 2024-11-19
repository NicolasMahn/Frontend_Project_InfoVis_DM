import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import BarChart from '../Charts/BarChart';

const COMPARING_PURCHASES_OF_PAIRS = gql`
query ComparingPurchasesOfPairs {
  comparingPurchasesOfPairs{
    location
    absolutCardPair
    absolutCarCardPair
    absolutNoCarCardPair
    absolutNoPair
    percentCardPair
    percentCarCardPair
    percentNoCarCardPair
    percentNoPair
    avgAmountCardPair
    avgAmountCarCardPair
    avgAmountNoCarCardPair
    avgAmountNoPair
  }
}
`

const ComparingPurchasesOfPairs = ({filterSettings, onFilterChange}) => {
  const { loading, error, data } = useQuery(COMPARING_PURCHASES_OF_PAIRS, {
    fetchPolicy: 'cache-and-network', // Use cache first, then network
  });

  const [chartData, setChartData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [colors, setColors] = useState([]);
  const [title, setTitle] = useState('Number of Purchases per Location');

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

      let type = filterSettings.type
      if (type === 'Absolute') {
        setTitle('Absolute Number of Purchases per Location')
        type = 'absolut'
      } else if (type === 'Percentage') {
        setTitle('Percent of Purchases per Category for every Location')
        type = 'percent'
      } else if (type === 'Avg Expense') {
        setTitle('Average Expense per Category for every Location')
        type = 'avgAmount'
      }
      let cp_type = type + 'CardPair'
      let ccp_type = type + 'CarCardPair'
      let nccp_type = type + 'NoCarCardPair'
      let np_type = type + 'NoPair'
      let types = [cp_type, ccp_type, nccp_type, np_type]
      let type_labels = ['Card Pair', 'Car Card Pair', 'No Car Card Pair', 'No Pair']


      const filtered = data.comparingPurchasesOfPairs
      .filter(data => filterSettings.locations.includes(data.location));
      

      // Sort the data by the number of credit card purchases
      let sortedData = filtered;
      for (let type of types) {
        if (filtered.length > 0 && type in filtered[0] && filterSettings.sortCategory === type_labels[types.indexOf(type)]) {
          sortedData = [...filtered].sort((a, b) => b[type] - a[type]);
        }
      }

      // Get a list of selected categories
      const categoryEntries = Object.entries(filterSettings.categories);
      const filteredCategories = categoryEntries.filter(([category_key, value]) => value);
      const selectedCategories = filteredCategories.map(([category_key]) => category_key);

      // Prepare data for the BarChart component
      let y = [];
      let legend = [];
      let colors = [];
      for (let type of types) {
        if (sortedData.length > 0 && selectedCategories.includes(type_labels[types.indexOf(type)])) {
          y.push(sortedData.map(d => d[type]));
          legend.push(type_labels[types.indexOf(type)]);
          colors.push(possipbleColors[types.indexOf(type)]);
        }
      }
      if (y.length === 1) {
        y = y[0];
      }
      const chartData = {
        x: sortedData.map(d => d.location),
        y: y
      };

      if (y.length > 0) {
        setChartData(chartData);
        setLegend(legend);
        setColors(colors);
      }

    }
  }, [data, filterSettings]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


    
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

  if (chartData.length < 0) {
    return <p>No data to display</p>
  }

  return (
    <div>
      <h2 className="header">{title}</h2>

      <BarChart data={chartData} legend={legend} colors={colors} onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
  );
}

export default ComparingPurchasesOfPairs;
