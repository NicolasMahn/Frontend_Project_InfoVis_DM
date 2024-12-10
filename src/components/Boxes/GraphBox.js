import { color } from 'd3';
import React from 'react';


const GraphBox = ({ GraphComponent, selectedGraph, onFilterChange, filterSettings, handleGraphAndFilterChange }) => {

  if (GraphComponent === undefined) {
    return (
      <div className="graph-box">
        <p>Error: Graph not found</p>
        <p> {selectedGraph} is not a valid GraphComponent</p>
      </div>
    );
  }

  return (
    <div className="graph-box">
      <GraphComponent onFilterChange={onFilterChange}  filterSettings={filterSettings}  handleGraphAndFilterChange={handleGraphAndFilterChange}/>
    </div>
  );
};

export default GraphBox;
