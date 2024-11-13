import React from 'react';
import GraphBox from './Boxes/GraphBox';
import ExplanationBox from './Boxes/ExplanationBox';
import FilterBox from './Boxes/FilterBox';
import ClusterMapBox from './Boxes/ClusterMapBox';
import SuspiciousActivityBox from './Boxes/SuspiciousActivityBox';

// Import all Graphs
import ExampleGraph from './Graphs/ExampleGraph';


// Importing the filters
import TimeFilter from './Filters/TimeFilter';
import CategoryFilter from './Filters/CategoryFilter';
import EmployeeFilter from './Filters/EmployeeFilter';
import LocationFilter from './Filters/LocationFilter';

const Dashboard = () => {
  return (
    <div className="dashboard-with-Heading">
      <h1 className="header" id="dashboard-header" >GASTech Employee Investigation Dashboard</h1>
      <div className="dashboard">
        <GraphBox GraphComponent={ExampleGraph} />
        <ExplanationBox />
        <FilterBox filters={[EmployeeFilter, LocationFilter, CategoryFilter, TimeFilter]} />
        <ClusterMapBox />
        <SuspiciousActivityBox />
      </div>
    </div>
  );
};

export default Dashboard;
