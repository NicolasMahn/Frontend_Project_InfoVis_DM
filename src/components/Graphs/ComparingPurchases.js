import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import BarChart from '../Charts/BarChart';

const COMPARING_PURCHASES = gql`
query ComparingPurchasesOfPairs {
  comparingPurchasesOfPairs{
    location
    absolutCc
    absolutLoyalty
    absolutCarsInArea
    absolutCardPair
    absolutCarCardPair
    absolutNoCarCardPair
    absolutNoPair
    percentCc
    percentLoyalty
    percentCarsInArea
    percentCardPair
    percentCarCardPair
    percentNoCarCardPair
    percentNoPair
    avgAmountCc
    avgAmountLoyalty
    avgAmountCarsInArea
    avgAmountCardPair
    avgAmountCarCardPair
    avgAmountNoCarCardPair
    avgAmountNoPair
  }
}
`

const ComparingPurchases = ({filterSettings, onFilterChange, handleGraphAndFilterChange}) => {
  const { loading, error, data } = useQuery(COMPARING_PURCHASES, {
    fetchPolicy: 'cache-and-network', // Use cache first, then network
  });

  const [chartData, setChartData] = useState([]);
  const [legend, setLegend] = useState([]);
  const [colors, setColors] = useState([]);
  const [title, setTitle] = useState('Number of Purchases per Location');
  const [yAxisLabel, setYAxisLabel] = useState('Number of Purchases');
  const [valueType, setValueType] = useState('%');

  // Access CSS variables
  const possipbleColors = [
    getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--tertiary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--quaternary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--quinary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--senary-color').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--septenary-color').trim()
  ];

  const possibleSpecialLocations = ["Katerin", "Magic Bean", "Frydo"];

  useEffect(() => {
    if (data) {

      let type = filterSettings.type
      if (type === 'Number of Purchases') {
        setYAxisLabel('Number of Purchases')
        setTitle('Absolute Number of Purchases per Location')
        setValueType('')
        type = 'absolut'
      } else if (type === 'Percentage of Purchases per Category') {
        setYAxisLabel('Percent of Purchases per Category')
        setTitle('Percent of Purchases per Category for every Location')
        setValueType('%')
        type = 'percent'
      } else if (type === 'Average Expense') {
        setYAxisLabel('Average Expense')
        setTitle('Average Expense per Category for every Location')
        setValueType('€')
        type = 'avgAmount'
      }
      let cc_type = type + 'Cc'
      let loyalty_type = type + 'Loyalty'
      let carsInArea_type = type + 'CarsInArea'
      let cp_type = type + 'CardPair'
      let ccp_type = type + 'CarCardPair'
      let nccp_type = type + 'NoCarCardPair'
      let np_type = type + 'NoPair'
      let types = [cc_type, loyalty_type, carsInArea_type, cp_type, ccp_type, nccp_type, np_type]
      let type_labels = ['Credit Card', 'Loyalty Card', 'Cars In Area', 'Card Pair', 'Car Card Pair', 'No Car Card Pair', 'No Pair']

      let locations = []
      let special_locations = []
      for (let l in filterSettings.locations) {
        for (let s in possibleSpecialLocations) {
          if (filterSettings.locations[l].includes(possibleSpecialLocations[s])) {
            special_locations.push(possibleSpecialLocations[s]);
          }
        }
      }

      for (let d in data.comparingPurchasesOfPairs) {
        if (!locations.includes(data.comparingPurchasesOfPairs[d].location)) {
          if (filterSettings.locations.includes(data.comparingPurchasesOfPairs[d].location)) {
            locations.push(data.comparingPurchasesOfPairs[d].location)
          } else {
            let b = false
            for (let s in special_locations) {
              if (data.comparingPurchasesOfPairs[d].location.includes(special_locations[s])) {
                locations.push(data.comparingPurchasesOfPairs[d].location)
                b = true
              }
            }
          }
        }
      }   

      const filtered = data.comparingPurchasesOfPairs
      .filter(data => locations.includes(data.location));
      

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

    handleGraphAndFilterChange('PurchasesOverTime', {locations: [d.category]}, title);
  };

  if (chartData.length < 1 || legend.length < 1 || colors.length < 1) {
    return <p>No data to display</p>
  }

  return (
    <div>
      <h2 className="header">{title}</h2>

      <BarChart data={chartData} legend={legend} colors={colors} yAxisLabel={yAxisLabel} valueType={valueType} onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
  );
}

export default ComparingPurchases;
