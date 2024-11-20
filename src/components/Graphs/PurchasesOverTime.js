import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import LineChart from '../Charts/LineChart';
import { filter, max, min, utcHour } from 'd3';

const PURCHASES_OVER_TIME_QUERY = gql`
  query PurchasesOverTime {
    purchasesOverTime { 
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
    const { loading, error, data } = useQuery(PURCHASES_OVER_TIME_QUERY, {
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
        getComputedStyle(document.documentElement).getPropertyValue('--senary-color').trim(),
        getComputedStyle(document.documentElement).getPropertyValue('--septenary-color').trim()
    ];

    const possibleSpecialLocations = ["Katerina", "Magic Bean", "Frydo"];
    
    useEffect(() => {
        if (data) {
            const timeFilter = filterSettings.time;
            const type = filterSettings.type;

            const fsCategories = filterSettings.categories
            let categories = []
            let categoryNames = []
            let colors = [];

            for (let c in fsCategories) {
                if (fsCategories[c]) {
                    if (c === "Credit Card") {
                        categories.push("creditcard");
                        categoryNames.push("Credit Card");
                        colors.push(possipbleColors[0]);
                    } else if (c === "Loyalty Card" && timeFilter !== "Average Work Day" && timeFilter !== "Average Weekend Day" && timeFilter !== "Average Day") {
                        categories.push("loyalty");
                        categoryNames.push("Loyalty");
                        colors.push(possipbleColors[1]);
                    } else if (c === "Cars In Area" && type === "Number of Purchases") {
                        categories.push("cars_in_area");
                        categoryNames.push("Cars In Area");
                        colors.push(possipbleColors[2]);
                    } else if (c === "Card Pair") {
                        categories.push("pairs");
                        categoryNames.push("Card Pair");
                        colors.push(possipbleColors[3]);
                    } else if (c === "No Pair") {
                        categories.push("no_pairs");
                        categoryNames.push("No Pair");
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

                for (let d in data.purchasesOverTime) {
                    if (!locations.includes(data.purchasesOverTime[d].location)) {
                        if (filterSettings.locations.includes(data.purchasesOverTime[d].location)) {
                            locations.push(data.purchasesOverTime[d].location)
                        } else {
                            for (let s in special_locations) {
                                if (data.purchasesOverTime[d].location.includes(special_locations[s])) {
                                    locations.push(data.purchasesOverTime[d].location)
                                }
                            }
                        }

                        
                    }
                }   
                const filteredData = data.purchasesOverTime
                .filter(data => locations.includes(data.location));

                let minTime = new Date(Math.min(...filteredData.map(d => d.starttime))* 1000);
                minTime.setHours(0, 0, 0, 0);
                minTime = minTime.getTime() / 1000;
                let maxTime = new Date(Math.max(...filteredData.map(d => d.endtime))*1000);
                maxTime.setHours(0, 0, 0, 0);
                maxTime.setDate(maxTime.getDate() + 1);
                maxTime = maxTime.getTime() / 1000;

                let legend = [];

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
                        if (categories.includes(d.type)) {
                            let inTime = ((d.endtime >= i && d.endtime <= i + timeInterval) || (d.starttime <=(i + timeInterval) && d.starttime >= i));
                            purchasesOverTime[d.type][k] += Number(inTime);
                            if (inTime) {
                                expensesOverTime[d.type][k] += d.price;
                            }
                        }
                    }
                    k += 1;
                    if (timeFilter === "Timeline") {
                        let xDate = new Date(i*1000);
                        let dateStringWithDay = xDate.toLocaleDateString('en-EU', {
                            weekday: 'long', // Options: 'long', 'short', 'narrow'
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
                        x.push(String(l));
                    }
                }
                for (let category in purchasesOverTime) {
                    if (type === "Number of Purchases") {
                        y.push(purchasesOverTime[category]);
                    } else {
                        y.push(expensesOverTime[category]);
                    }
                    legend.push(category);
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
                }
            } else {
                setChartData([]);
                setLegend([]);
                setColors([]);
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
    };
    
    const handleBarDoubleClick = (d) => {
        console.log("Bar double-clicked:", d);
    };
    
    if (chartData.length < 1 || legend.length < 1 || colors.length < 1) {
        return <p>No data to display</p>
    }   

    return (
    <div>
        <h2 className="header">{title}</h2>
        <LineChart data={chartData} legend={legend} colors={colors} onBarClick={handleBarClick} onBarRightClick={handleBarRightClick} onBarDoubleClick={handleBarDoubleClick}/>
    </div>
    );
    }

export default PurchasesOverTime;