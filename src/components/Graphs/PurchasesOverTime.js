import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import LineChart from '../Charts/LineChart';
import { filter, max, min, utcHour } from 'd3';

const PURCHASES_OVER_TIME_QUERY = gql`
  query PurchasesOverTime($locations: [String], $types: [String]) {
    purchasesOverTime(locations: $locations, types: $types) { 
        starttime 
        endtime 
        type 
        location 
        price 
        creditcard 
        loyalty 
        carId 
        startCoordinates 
        endCoordinates }
  }
`

const PurchasesOverTime = ({filterSettings, onFilterChange}) => {
    const [chartData, setChartData] = useState([]);
    const [legend, setLegend] = useState([]);
    const [tooltipData, setTooltipData] = useState([]);
    const [colors, setColors] = useState([]);
    const [title, setTitle] = useState('Number of Purchases per Location');

    const [locationsForType, setLocationsForTypes] = useState({});
    const [savedData, setData] = useState(null);
    const [fetchError, setError] = useState(null);

    const [yAxisLabel, setYAxisLabel] = useState('Number of Purchases');
    const [valueType, setValueType] = useState('');

    const { loading, error, data, refetch } = useQuery(PURCHASES_OVER_TIME_QUERY, {
        skip: true, // Skip the initial automatic query execution
        fetchPolicy: 'cache-and-network', // Use cache first, then network
    });

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

    const possibleSpecialLocations = ["Katerina", "Magic Bean", "Frydo"];
    
    useEffect(() => {
        let currentLocations = filterSettings.locations;
        let currentCategories = [];
        for (let cCategory of Object.keys(filterSettings.categories).filter(key => filterSettings.categories[key] === true)) {
            if (cCategory === "Credit Card") {
                currentCategories.push("creditcard");
            } else if (cCategory === "Loyalty Card") {
                currentCategories.push("loyalty");
            } else if (cCategory === "Cars In Area") {
                currentCategories.push("cars_in_area");
            } else if (cCategory === "Card Pair") {
                currentCategories.push("pairs");
            } else if (cCategory === "No Pair") {
                currentCategories.push("no_pairs");
            }
        }

        let newLocations = [];

        for (let currentCategory of currentCategories) {
            if (!locationsForType.hasOwnProperty(currentCategory) ||
                currentLocations.some(location => !locationsForType[currentCategory].includes(location))) {
                newLocations = [...locationsForType[currentCategory] || [], ...currentLocations];

                setLocationsForTypes(prevLocationsForTypes => ({
                    ...prevLocationsForTypes,
                    [currentCategory]: [
                        ...(prevLocationsForTypes[currentCategory] || []),
                        ...newLocations
                    ]
                }));
            }
        }
        if (currentCategories.some(category => !locationsForType.hasOwnProperty(category) ||
        currentLocations.some(location => !locationsForType[category].includes(location)))) {
            // Manually execute the query after state updates
            refetch({ locations: newLocations, types: currentCategories }).then(({ data }) => {
                setData(prevData => ({
                    ...prevData,
                    purchasesOverTime: [
                        ...(prevData ? prevData.purchasesOverTime : []),
                        ...data.purchasesOverTime
                    ]
                }));
            }).catch(error => {
                setError(error);
            });
        }
        if (savedData) {
            const timeFilter = filterSettings.time;
            const type = filterSettings.type;

            if (type === "Number of Purchases") {
                setYAxisLabel("Number of Purchases");
                setValueType("");
            } else if (type === "Expenses over Time") {
                setYAxisLabel("Expenses");
                setValueType("€");
            }

            const fsCategories = filterSettings.categories
            let categories = []
            let categoryNames = []
            let colors = [];
            let legend = [];
            let tooltipData = [];

            for (let c in fsCategories) {
                if (fsCategories[c]) {
                    if (c === "Credit Card") {
                        categories.push("creditcard");
                        categoryNames.push("Credit Card");
                        legend.push("Credit Card");
                        colors.push(possipbleColors[0]);
                    } else if (c === "Loyalty Card" && timeFilter !== "Average Work Day" &&
                         timeFilter !== "Average Weekend Day" && timeFilter !== "Average Day") {
                        categories.push("loyalty");
                        categoryNames.push("Loyalty");
                        legend.push("Loyalty Card");
                        colors.push(possipbleColors[1]);
                    } else if (c === "Cars In Area" && type === "Number of Purchases") {
                        categories.push("cars_in_area");
                        categoryNames.push("Cars In Area");
                        legend.push("Cars In Area");
                        colors.push(possipbleColors[2]);
                    } else if (c === "Card Pair") {
                        categories.push("pairs");
                        categoryNames.push("Card Pair");
                        legend.push("Card Pair");
                        colors.push(possipbleColors[3]);
                    } else if (c === "No Pair") {
                        categories.push("no_pairs");
                        categoryNames.push("No Pair");
                        legend.push("No Pair");
                        colors.push(possipbleColors[6]);
                    }
                }
            }
            let locations = []
            if (filterSettings.locations.length !== 0) {
                
                let special_locations = []
                for (let l in filterSettings.locations) {
                    for (let s in possibleSpecialLocations) {
                        if (filterSettings.locations[l].includes(possibleSpecialLocations[s])) {
                            special_locations.push(possibleSpecialLocations[s]);
                        }
                    }
                }

                for (let d in savedData.purchasesOverTime) {
                    if (!locations.includes(savedData.purchasesOverTime[d].location)) {
                        if (filterSettings.locations.includes(savedData.purchasesOverTime[d].location)) {
                            locations.push(savedData.purchasesOverTime[d].location)
                        } else {
                            for (let s in special_locations) {
                                if (savedData.purchasesOverTime[d].location.includes(special_locations[s])) {
                                    locations.push(savedData.purchasesOverTime[d].location)
                                }
                            }
                        }

                        
                    }
                }   
                const filteredData = savedData.purchasesOverTime
                .filter((data, index, self) => locations.includes(data.location) && 
                    index === self.findIndex((t) => (
                        t.starttime === data.starttime && t.endtime === data.endtime && t.location === data.location && t.type === data.type && t.price === data.price && t.creditcard === data.creditcard && t.loyalty === data.loyalty && t.carId === data.carId && t.startCoordinates === data.startCoordinates && t.endCoordinates === data.endCoordinates
                    ))
                );

                let minTime = new Date(Math.min(...filteredData.map(d => d.starttime))* 1000);
                minTime.setHours(0, 0, 0, 0);
                minTime = minTime.getTime() / 1000;
                let maxTime = new Date(Math.max(...filteredData.map(d => d.endtime))*1000);
                maxTime.setHours(0, 0, 0, 0);
                maxTime.setDate(maxTime.getDate() + 1);
                maxTime = maxTime.getTime() / 1000;

                const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
                const sum = arr => arr.reduce((a, b) => a + b, 0);

                let y = [];
                let x = [];
                let purchasesOverTime = {};
                let expensesOverTime = {};
                let timeInterval = 1;
                let totalIntervals = 0;
                if (timeFilter === "Average Day" || timeFilter === "Average Work Day" || timeFilter === "Average Weekend Day") {
                    timeInterval = 60*60;
                    totalIntervals = 24;
                } else if (timeFilter === "Average Week") {
                    timeInterval = 60*60*24;
                    totalIntervals = 7;
                } else if (timeFilter === "Timeline") {
                    timeInterval = 60*60*24;
                    totalIntervals = Math.ceil((maxTime - minTime) / timeInterval);
                }
                for (let category in categories) {
                    purchasesOverTime[categories[category]] = new Array(totalIntervals).fill(0);
                    expensesOverTime[categories[category]] = new Array(totalIntervals).fill(0);
                }
 
                const deepCopy = (obj) => {
                    return JSON.parse(JSON.stringify(obj));
                };

                let k = 0;
                for (let i = minTime; i < maxTime; i += timeInterval) {
                    if (timeFilter === "Average Week")  {
                        k = new Date(i * 1000).getDay();
                    } else if (timeFilter === "Average Work Day") {
                        k = new Date(i * 1000).getDay();
                        if (k === 0 || k === 6) {
                            continue;
                        }
                    } else if (timeFilter === "Average Weekend Day") {
                        k = new Date(i * 1000).getDay();
                        if (k !== 0 && k !== 6) {
                            continue;
                        }
                    }
                    if (timeFilter === "Average Day" || timeFilter === "Average Work Day" || timeFilter === "Average Weekend Day") {
                        k = new Date(i * 1000).getUTCHours();
                    }

                    for (let j in filteredData) {
                        let d = filteredData[j];
                        if (categories.includes(d.type) && ((d.endtime >= i && d.endtime <= i + timeInterval - 1) || (d.starttime <=(i + timeInterval - 1) && d.starttime >= i))) {
                            purchasesOverTime[d.type][k] += 1;
                            expensesOverTime[d.type][k] += d.price;
                        }
                    }
                    k += 1;
                    if (timeFilter === "Timeline") {
                        let xDate = new Date(i*1000);
                        let dateStringWithDay = xDate.toLocaleDateString('en-EU', {
                            year: 'numeric',
                            month: '2-digit', // Options: 'numeric', '2-digit', 'long', 'short', 'narrow'
                            day: 'numeric',
                        });
                        x.push(dateStringWithDay);
                    }
                }

                if (timeFilter === "Average Week") {
                    x = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                } else if (timeFilter === "Average Work Day" || timeFilter === "Average Weekend Day" || timeFilter === "Average Day") {
                    for (let l = 0; l < 24; l++) {
                        x.push(String(l)+':00');
                    }
                }

                const labelType = type === "Number of Purchases" ? "Purchases" : "Expenses";
                const labelTimeFilter = timeFilter === "Timeline" ? "" : `on an ${timeFilter}`;

                for (let category in purchasesOverTime) {
                    if (type === "Number of Purchases") {
                        y.push(purchasesOverTime[category]);
                        tooltipData.push(`Average ${labelType} ${labelTimeFilter}: ${avg(purchasesOverTime[category]).toFixed(2)}<br> Total ${labelType} ${labelTimeFilter}: ${sum(purchasesOverTime[category])}`);
                    } else {
                        y.push(expensesOverTime[category]);
                        tooltipData.push(`Average ${labelType} ${labelTimeFilter}: ${avg(expensesOverTime[category]).toFixed(2)}€<br> Total ${labelType} ${labelTimeFilter}: ${sum(expensesOverTime[category]).toFixed(2)}€`);
                    }
                }

                if (y.length === 1) {
                    y = y[0];
                }
                const chartData = {
                    x: x,
                    y: y
                };


                if (type === "Number of Purchases" && timeFilter === "Timeline") {
                    setTitle("Number of Purchases over Time");
                } else if (type === "Expenses over Time" && timeFilter === "Timeline") {
                    setTitle("Expenses over Time");
                } else if (type === "Number of Purchases" && timeFilter === "Average Day") {
                    setTitle("Average Number of Purchases per Hour");
                } else if (type === "Expenses over Time" && timeFilter === "Average Day") {
                    setTitle("Average Expenses per Hour");
                } else if (type === "Number of Purchases" && timeFilter === "Average Work Day") {
                    setTitle("Average Number of Purchases per Hour on Work Days");
                } else if (type === "Expenses over Time" && timeFilter === "Average Work Day") {
                    setTitle("Average Expenses per Hour on Work Days");
                } else if (type === "Number of Purchases" && timeFilter === "Average Weekend Day") {
                    setTitle("Average Number of Purchases per Hour on Weekend Days");
                } else if (type === "Expenses over Time" && timeFilter === "Average Weekend Day") {
                    setTitle("Average Expenses per Hour on Weekend Days");
                } else if (type === "Number of Purchases" && timeFilter === "Average Week") {
                    setTitle("Average Number of Purchases per Day of the Week");
                } else if (type === "Expenses over Time" && timeFilter === "Average Week") {
                    setTitle("Average Expenses per Day of the Week");
                }
            
                if (y.length > 0) {
                    setChartData(chartData);
                    setLegend(legend);
                    setColors(colors);
                    setTooltipData(tooltipData);
                }
            } else {
                setChartData([]);
                setLegend([]);
                setColors([]);
                setTooltipData([]);
            }
        }
    }, [data, filterSettings, savedData]);
    
    if (loading) return <p>Loading...</p>;
    if (error || fetchError) return <p>Error: {error.message}</p>;


    const handleBarClick = (d) => {
        console.log("Bar clicked:", d);
    };
    
    const handleBarRightClick = (d) => {
        console.log("Bar right-clicked:", d);
    };
    
    const handleBarDoubleClick = (d) => {
        console.log("Bar double-clicked:", d);
    };
    
    if (chartData.length < 1 || legend.length < 1 || colors.length < 1) {
        return <p>No data to display | Loading...</p>
    }  


    return (
    <div>
        <h2 className="header">{title}</h2>
        <LineChart data={chartData} legend={legend} colors={colors} tooltipData={tooltipData} yAxisLabel={yAxisLabel} valueType={valueType}  onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
    );
    }

export default PurchasesOverTime;