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
import LandingPage from './Graphs/LandingPage.js';


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
import ImageComponent from './Filters/ImageComponent.js';

import defaultCookieJson from './defaultCookie.json';
import { filter } from 'd3';


const graphComponents = {
  ExampleGraph,
  NumbPurchasesPerLocation,
  ComparingPurchases,
  PurchasesOverTime,
  CardMatrixGraph,
  CarMatrixGraph,
  LandingPage
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
  CarID: CarIDFilter,
  ImageComponent: ImageComponent
};

const Dashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState('ComparingPurchases');
  const [graphConfig, setGraphConfig] = useState({});
  const [filterSettings, setFilterSettings] = useState(
    { 
      locations: [
        "Gelatogalore",
        "Brew've Been Served",
        "Ouzeri Elian",
        "Albert's Fine Clothing",
        "Abila Airport",
        "Kalami Kafenion",
        "Jack's Magical Beans",
        "Bean There Done That",
        "Hallowed Grounds",
        "Nationwide Refinery",
        "Katerina's Cafe",
        "Abila Zacharo",
        "Brewed Awakenings",
        "Desafio Golf Course",
        "Coffee Cameleon",
        "Frydos Autosupply n' More",
        "Hippokampos",
        "Guy's Gyros"
      ], 
      categories: {"Credit Card": true, "Loyalty Card": true, "Cars In Area": false, "Card Pair": false, "No Pair": false}, 
      sortCategory: '' 
    });

  const [cookieData, setCookieData] = useState([]);
  const [title, setTitle] = useState('');

  const desiredVersion = 'V0.6';
  const cookieName = 'cookie'+desiredVersion;

  // Function to get all cookies
  function getAllCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        cookies[name] = value;
        return cookies;
    }, {});
  }
  const cookies = getAllCookies();
  
  const getCookie = () => {
    let cookieData = [];

    // Delete cookies with the wrong version
    Object.keys(cookies).forEach(cookieName_ => {
      const cookieParts = cookieName_.split('_');
      if (cookieParts[0] !== `cookie${desiredVersion}`) {
        document.cookie = cookieName_ + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    });

    for (let index = 0; ; index++) {
      let cookieString = Cookies.get(`${cookieName}_${index}`);
      if (!cookieString) {
        break;
      }
      if (cookieString.includes("Katerina's Cafe")) {
        cookieString = cookieString.replace("Katerina's Cafe", "Katerina’s Café");
      }
      cookieData.push(JSON.parse(cookieString));
    }
    return cookieData;
  }

  const saveCookie = (cookieData) => {
    try {
      cookieData.forEach((value, index) => {
        let cookieString = JSON.stringify(value);
        cookieString = cookieString.replace(/’/g, "'").replace(/é/g, "e");
  
        //console.log(`Cookie length for index ${index}:`, cookieString.length);
        if (cookieString.length > 4096) {
          console.error(`Cookie data for index ${index} is too large to be saved.`);
          return;
        }
  
        const specialCharMatch = cookieString.match(/[^ -~]/);
        if (specialCharMatch) {
          const idx = specialCharMatch.index;
          const context = cookieString.substring(Math.max(0, idx - 10), Math.min(cookieString.length, idx + 10));
          //console.error(`Cookie data for index ${index} contains special characters that may cause issues. Context: "${context}"`);
          return;
        }
  
        Cookies.set(`${cookieName}_${index}`, cookieString, { expires: 7 });
        // console.log(`Cookie saved for index ${index}:`, Cookies.get(`${cookieName}_${index}`));
      });
    } catch (error) {
      console.error('Error serializing cookie data:', error);
    }
  }

  const deleteCookie = () => {
    for (let index = 0; ; index++) {
      let cookieString = Cookies.get(`${cookieName}_${index}`);
      if (!cookieString) {
        break;
      }
      Cookies.remove(`${cookieName}_${index}`);
    }
    setCookieData([]);
  
    if (Array.isArray(defaultCookieJson)) {
      const defaultCookie = defaultCookieJson;
      saveCookie(defaultCookie);
      setCookieData(defaultCookie);
    } else {
      console.error('Default cookie is not an array:', defaultCookieJson);
    }
  }

  useEffect(() => {
    // Check if the cookie exists

    const cookieValue = getCookie()
    let existingGraphs = [];

    if (cookieValue) {
      try {
        if (Array.isArray(cookieValue)) {
          existingGraphs = cookieValue;
        } else {
          console.error('Cookie is not an array:', cookieValue);
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
      } else {
        console.error('Default cookie is not an array:', defaultCookieJson);
      }
    }
    let cookieData = getCookie();
    if (!cookieData) {
      return;
    }
    const selectedG = cookieData.filter(g=> g.selected === true)[0];

    if (selectedG && selectedG.filterSettings) {
      setFilterSettings(selectedG.filterSettings);
    } else {
      setFilterSettings(cookieData.filter(g => g.parent === selectedG.id)[0].filterSettings);
    }
    handleGraphAndFilterChange(selectedG);
  }, [cookieName]);


  useEffect(() => {

  }, []);


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
    window.history.pushState({ selectedGraph, filterSettings }, title);
    let cookieData = getCookie();
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
      
      if (event.state) {
        // console.log(event.state);
        if (event.state.filterSettings) {
          // console.log(event.state.filterSettings.filterSettings);
          setFilterSettings(event.state.filterSettings.filterSettings);
        }
        if (event.state.selectedGraph) {
          // console.log(event.state.selectedGraph);
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
