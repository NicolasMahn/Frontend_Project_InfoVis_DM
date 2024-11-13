// src/components/Dashboard.js
import React from 'react';
import GraphBox from './Boxes/GraphBox';
import ExplanationBox from './Boxes/ExplanationBox';
import FilterBox from './Boxes/FilterBox';
import ClusterMapBox from './Boxes/ClusterMapBox';
import SuspiciousActivityBox from './Boxes/SuspiciousActivityBox';

const Dashboard = () => {
  return (
    <div className="dashboard-with-Heading">
      <h1 className="header" id="dashboard-header" >GASTech Employee Investigation Dashboard</h1>
      <div className="dashboard">
        <GraphBox />
        <ExplanationBox />
        <FilterBox />
        {/* <SaveBox /> 
        <SelectionBox />*/}
        <ClusterMapBox />
        <SuspiciousActivityBox />
      </div>
    </div>
  );
};

export default Dashboard;
