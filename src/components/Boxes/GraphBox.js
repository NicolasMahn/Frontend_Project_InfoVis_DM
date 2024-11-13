import React from 'react';


const GraphBox = ({ GraphComponent }) => {
  return (
    <div className="graph-box">
      <GraphComponent />
    </div>
  );
};

export default GraphBox;
