import React, { useState, useEffect } from 'react';
import yaml from 'yaml';
import Cookies from 'js-cookie';

import GraphBox from './Boxes/GraphBox';
import ExplanationBox from './Boxes/ExplanationBox';
import FilterBox from './Boxes/FilterBox';
import NavigationBox from './Boxes/NavigationBox';


// Import all Graphs
import ExampleGraph from './Graphs/ExampleGraph';
import NumbPurchasesPerLocation from './Graphs/NumbPurchasesPerLocation';
import ComparingPurchases from './Graphs/ComparingPurchases.js';
import PurchasesOverTime from './Graphs/PurchasesOverTime.js';
import CardMatrixGraph from './Graphs/CardMatrixGraph.js';
import CarMatrixGraph from './Graphs/CarMatrixGraph.js';

// Importing the filters
import TimeFilter from './Filters/TimeFilter';
import CategoryFilter from './Filters/CategoryFilter';
import EmployeeFilter from './Filters/EmployeeFilter';
import LocationFilter from './Filters/LocationFilter';
import SortCategoriesAfter from './Filters/SortCategoriesAfter';
import TypeFilter from './Filters/TypeFilter.js';
import CreditCardFilter from './Filters/CreditCardFilter.js';
import LoyaltyCardFilter from './Filters/LoyaltyCardFilter.js';
import CarIDFilter from './Filters/CarFilter.js';

import defaultCookieJson from './defaultCookie.json';

const graphComponents = {
  ExampleGraph,
  NumbPurchasesPerLocation,
  ComparingPurchases,
  PurchasesOverTime,
  CardMatrixGraph,
  CarMatrixGraph
};

const filterComponents = {
  Time: TimeFilter,
  Category: CategoryFilter,
  SortCategoriesAfter: SortCategoriesAfter,
  Employee: EmployeeFilter,
  Location: LocationFilter,
  Type: TypeFilter,
  CreditCard: CreditCardFilter,
  LoyaltyCard: LoyaltyCardFilter,
  CarID: CarIDFilter
};

const Dashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState('ComparingPurchases');
  const [graphConfig, setGraphConfig] = useState({});
  const [filterSettings, setFilterSettings] = useState(
    { 
      locations: [
        "Gelatogalore",
        "Brew've Been Served",
        "Ahaggo Museum",
        "Ouzeri Elian",
        "Roberts and Sons",
        "Albert's Fine Clothing",
        "Abila Airport",
        "Stewart and Sons Fabrication",
        "Kalami Kafenion",
        "Jack's Magical Beans",
        "Bean There Done That",
        "Octavio's Office Supplies",
        "Abila Scrapyard",
        "Hallowed Grounds",
        "Chostus Hotel",
        "Daily Dealz",
        "U-Pump",
        "Nationwide Refinery",
        "Maximum Iron and Steel",
        "Katerina’s Café",
        "Frank's Fuel",
        "Kronos Pipe and Irrigation",
        "Abila Zacharo",
        "Shoppers' Delight",
        "Brewed Awakenings",
        "Desafio Golf Course",
        "General Grocer",
        "Carlyle Chemical Inc.",
        "Coffee Shack",
        "Coffee Cameleon",
        "Frydos Autosupply n' More",
        "Hippokampos",
        "Kronos Mart",
        "Guy's Gyros"
      ], 
      categories: {"Credit Card": true, "Loyalty Card": true, "Cars In Area": false, "Card Pair": false, "No Pair": false}, 
      sortCategory: '' 
    });

  const [cookieData, setCookieData] = useState([]);
  const [title, setTitle] = useState('');

  const cookieName = 'cookieV0.1';
  
  const getCookie = () => {
    let cookieData = Cookies.get(cookieName);
    if (cookieData.includes("Katerina's Cafe")) {
      console.log('Replacing "Katerina\'s Cafe" with "Katerina’s Café" in the cookie data.');
      cookieData = cookieData.replace("Katerina's Cafe", "Katerina’s Café");
    }
    return cookieData;
  }

  const saveCookie = (cookieData) => {
    try {
      console.log('Saving cookie:', JSON.stringify(cookieData));
      const cookieString = JSON.stringify(cookieData).toString();
      console.log('Saving cookie:', cookieString);

      console.log('Cookie size:', cookieString.length, 'bytes');
      if (cookieString.length > 4096) {
        console.error('Cookie data is too large to be saved.');
        return;
      }
      const specialCharMatch = cookieString.match(/[^ -~]/);
      if (specialCharMatch) {
        const index = specialCharMatch.index;
        const context = cookieString.substring(Math.max(0, index - 10), Math.min(cookieString.length, index + 10));
        console.error(`Cookie data contains special characters that may cause issues. Context: "${context}"`);
        return;
      }
      Cookies.set(cookieName, cookieString, { expires: 7 });
    } catch (error) {
      console.error('Error serializing cookie data:', error);
    }
  }

  const deleteCookie = () => {
    Cookies.remove(cookieName);
    setCookieData([]);
    console.log('Cookie has been deleted.');

    // Ensure defaultCookie is an array
    if (Array.isArray(defaultCookieJson)) {
      // Set the cookie if it doesn't exist
      const defaultCookie = defaultCookieJson
      saveCookie(defaultCookie)
      setCookieData(defaultCookie);
      console.log('Default cookie has been set.');
    } else {
      console.error('Default cookie is not an array:', defaultCookieJson);
    }
  };

  useEffect(() => {
    // Check if the cookie exists
    const cookieValue = getCookie()
    let existingGraphs = [];
    console.log(cookieValue);

    if (cookieValue) {
      try {
        const parsedCookie = JSON.parse(cookieValue);
        if (Array.isArray(parsedCookie)) {
          console.log('Cookie has been parsed:', parsedCookie);
          existingGraphs = parsedCookie;
        } else {
          console.error('Cookie is not an array:', parsedCookie);
        }
      } catch (error) {
        console.error('Failed to parse cookie:', error);
      }

      // Merge default cookie items with existing saved cookies
      const mergedGraphs = [...existingGraphs];
      defaultCookieJson.forEach(defaultItem => {
        if (!mergedGraphs.some(item => item.id === defaultItem.id)) {
          mergedGraphs.push(defaultItem);
        }
      });

      // Update the client cookie with the merged result
      saveCookie(mergedGraphs)
      setCookieData(mergedGraphs);
    } else {
      // Ensure defaultCookie is an array
      if (Array.isArray(defaultCookieJson)) {
        // Set the cookie if it doesn't exist
        const defaultCookie = defaultCookieJson;
        saveCookie(defaultCookie)
        setCookieData(defaultCookie);
        console.log('Default cookie has been set.');
      } else {
        console.error('Default cookie is not an array:', defaultCookieJson);
      }
    }

    console.log("TEST", getCookie());
  }, [cookieName]);

  const handleFilterChange = (newSettings, title=null) => {
    if (!title) {
      title = "filterSettings";
    }
    window.history.pushState({ filterSettings: { filterSettings} }, title);
    setFilterSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));

  };

  const handleGraphAndFilterChange = (newGraph, title=null) => {
    if (!title) {
      title = selectedGraph.id + ' - ' + "filterSettings";
    }
    console.log(title)
    window.history.pushState({ selectedGraph, filterSettings }, title);
    const newCookieData = cookieData.map(g => ({ ...g, selected: g.id === newGraph.id || g.id === newGraph.parent ? true : false }));
    setCookieData(newCookieData);
    saveCookie(newCookieData);
    setSelectedGraph(newGraph.graph);
    setFilterSettings(prevSettings => ({
      ...prevSettings,
      ...newGraph.filterSettings,
    }));
  };

  fetch('/graphs.yaml')
    .then(response => response.text())
    .then(text => {
      const config = yaml.parse(text);
      setGraphConfig(config);
    })
    .catch(error => console.error('Error fetching the YAML file:', error));


  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      // Handle the back button press here
      console.log('Back button pressed');
      
      if (event.state) {
        console.log(event.state);
        if (event.state.filterSettings) {
          console.log(event.state.filterSettings.filterSettings);
          setFilterSettings(event.state.filterSettings.filterSettings);
        }
        if (event.state.selectedGraph) {
          console.log(event.state.selectedGraph);
          setSelectedGraph(event.state.selectedGraph);
        }
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);
  
  const GraphComponent = graphComponents[selectedGraph];
  const filters = graphConfig[selectedGraph]?.filters.map(filter => filterComponents[filter]) || [];
  const config = graphConfig[selectedGraph] || {};

  return (
    <div className="dashboard-with-Heading">
      <h1 className="header" id="dashboard-header">GASTech Employee Investigation Dashboard</h1>
      <div className="dashboard">
        <NavigationBox handleGraphAndFilterChange={handleGraphAndFilterChange} cookieData={cookieData}/>
        <GraphBox GraphComponent={GraphComponent} selectedGraph={selectedGraph} 
                  onFilterChange={handleFilterChange} filterSettings={filterSettings} handleGraphAndFilterChange={handleGraphAndFilterChange} />
        <FilterBox filters={filters} onFilterChange={handleFilterChange} filterSettings={filterSettings} config={config}/>
        <ExplanationBox selectedGraph={selectedGraph} filterSettings={filterSettings} handleGraphAndFilterChange={handleGraphAndFilterChange} 
                        cookieData={cookieData} deleteCookie={deleteCookie} saveCookie={saveCookie}
                        setCookieData={setCookieData} 
                        title={title} setTitle={setTitle}/>
      </div>
    </div>
  );
};

export default Dashboard;
