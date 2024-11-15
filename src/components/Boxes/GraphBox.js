import React from 'react';


const GraphBox = ({ GraphComponent, onFilterChange, filterSettings }) => {
  return (
    <div className="graph-box">
      <GraphComponent onFilterChange={onFilterChange}  filterSettings={filterSettings}/>
    </div>
  );
};

export default GraphBox;
