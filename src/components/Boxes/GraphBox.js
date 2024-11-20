import React from 'react';


const GraphBox = ({ GraphComponent, onFilterChange, filterSettings, handleGraphAndFilterChange }) => {
  return (
    <div className="graph-box">
      <GraphComponent onFilterChange={onFilterChange}  filterSettings={filterSettings}  handleGraphAndFilterChange={handleGraphAndFilterChange}/>
    </div>
  );
};

export default GraphBox;
