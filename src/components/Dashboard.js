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

import buttonSettingsJSON from './buttonSettings.json';
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
  const [selectedGraph, setSelectedGraph] = useState('LandingPage');
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

  const [buttonSettings, setButtonSettings] = useState(buttonSettingsJSON);

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
    const newCookieData = buttonSettings.map(g => ({ ...g, selected: g.id === newGraph.id || g.id === newGraph.parent ? true : false }));
    setButtonSettings(newCookieData);
    setSelectedGraph(newGraph.graph);
    setFilterSettings(prevSettings => ({
      ...prevSettings,
      ...newGraph.filterSettings,
    }));
  };

  useEffect(() => {
  fetch('/graphs.yaml')
    .then(response => response.text())
    .then(text => {
      const config = yaml.parse(text);
      setGraphConfig(config);
    })
    .catch(error => console.error('Error fetching the YAML file:', error));
  }, []);

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
        <NavigationBox handleGraphAndFilterChange={handleGraphAndFilterChange} buttonSettings={buttonSettings}/>
        <GraphBox GraphComponent={GraphComponent} selectedGraph={selectedGraph} 
                  onFilterChange={handleFilterChange} filterSettings={filterSettings} handleGraphAndFilterChange={handleGraphAndFilterChange} />
        <FilterBox filters={filters} onFilterChange={handleFilterChange} filterSettings={filterSettings} config={config} handleGraphAndFilterChange={handleGraphAndFilterChange} buttonSettings={buttonSettings}/>
      </div>
    </div>
  );
};

export default Dashboard;
