import React from 'react';


const GraphBox = ({ GraphComponent, filterSettings }) => {
  return (
    <div className="graph-box">
      <GraphComponent filterSettings={filterSettings}/>
    </div>
  );
};

export default GraphBox;
