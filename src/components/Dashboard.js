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

// Importing the filters
import TimeFilter from './Filters/TimeFilter';
import CategoryFilter from './Filters/CategoryFilter';
import EmployeeFilter from './Filters/EmployeeFilter';
import LocationFilter from './Filters/LocationFilter';

const graphComponents = {
  ExampleGraph,
  NumbPurchasesPerLocation,
};

const filterComponents = {
  Time: TimeFilter,
  Category: CategoryFilter,
  Employee: EmployeeFilter,
  Location: LocationFilter,
};

const Dashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState('ExampleGraph');
  const [graphConfig, setGraphConfig] = useState({});

  useEffect(() => {
    fetch('/graphs.yml')
      .then(response => response.text())
      .then(text => {
        const config = yaml.parse(text);
        setGraphConfig(config);
      })
      .catch(error => console.error('Error fetching the YAML file:', error));
  }, []);
  const GraphComponent = graphComponents[selectedGraph];
  const filters = graphConfig[selectedGraph]?.filters.map(filter => filterComponents[filter]) || [];

  return (
    <div className="dashboard-with-Heading">
      <h1 className="header" id="dashboard-header">GASTech Employee Investigation Dashboard</h1>
      <div className="dashboard">
        <GraphBox GraphComponent={GraphComponent} />
        <ExplanationBox />
        <FilterBox filters={filters} />
        <ClusterMapBox />
        <SuspiciousActivityBox setSelectedGraph={setSelectedGraph} />
      </div>
    </div>
  );
};

export default Dashboard;
