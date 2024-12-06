import React, { useState, useEffect } from 'react';
import GraphBox from './Boxes/GraphBox';
import ExplanationBox from './Boxes/ExplanationBox';
import FilterBox from './Boxes/FilterBox';
import ClusterMapBox from './Boxes/ClusterMapBox';
import SuspiciousActivityBox from './Boxes/SuspiciousActivityBox';
import yaml from 'yaml';

// Import all Graphs
import ExampleGraph from './Graphs/ExampleGraph';
import NumbPurchasesPerLocation from './Graphs/NumbPurchasesPerLocation';
import ComparingPurchasesOfPairs from './Graphs/ComparingPurchasesOfPairs';
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


const graphComponents = {
  ExampleGraph,
  NumbPurchasesPerLocation,
  ComparingPurchasesOfPairs,
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
  const [selectedGraph, setSelectedGraph] = useState('ComparingPurchasesOfPairs');
  const [graphConfig, setGraphConfig] = useState({});
  const [filterSettings, setFilterSettings] = useState(
    { 
      locations: [], 
      categories: {"Credit Card": true, "Loyalty Card": true, "Cars In Area": false, "Card Pair": false, "No Pair": false}, 
      sortCategory: '' 
    });

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

  const handleGraphChange = (newGraph, title=null) => {
    if (!title) {
      title = selectedGraph;
    }
    window.history.pushState({ selectedGraph, filterSettings }, title)
    setSelectedGraph(newGraph);
  };

  const handleGraphAndFilterChange = (newGraph, newSettings, title=null) => {
    if (!title) {
      title = selectedGraph + ' - ' + "filterSettings";
    }
    console.log(title)
    window.history.pushState({ selectedGraph, filterSettings }, title);
    setSelectedGraph(newGraph);
    setFilterSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  useEffect(() => {
    fetch('/graphs.yml')
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
        <GraphBox GraphComponent={GraphComponent} onFilterChange={handleFilterChange} filterSettings={filterSettings} handleGraphAndFilterChange={handleGraphAndFilterChange} />
        <ExplanationBox selectedGraph={selectedGraph} filterSettings={filterSettings} handleGraphAndFilterChange={handleGraphAndFilterChange}/>
        <FilterBox filters={filters} onFilterChange={handleFilterChange} filterSettings={filterSettings} config={config} />
        {//<SuspiciousActivityBox setSelectedGraph={handleGraphChange} />
        }
      </div>
    </div>
  );
};

export default Dashboard;
