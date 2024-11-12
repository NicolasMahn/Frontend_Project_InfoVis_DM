import React from 'react';
import GraphComponent from './Graphs/GraphComponent';
import Filters from './Filters/Filters';

const Dashboard = () => (
  <div>
    <Filters />
    <GraphComponent />
  </div>
);

export default Dashboard;
