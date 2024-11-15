import React from 'react';


const ExampleGraph = ({filterSettings}) =>{
  return (
    <div>
      <h2 className="header">Graph Visualizations</h2>
      {/* Placeholder for D3 Graph */}
      <pre>{JSON.stringify(filterSettings, null, 2)}</pre>
      <svg width="500" height="300">
        <rect width="500" height="300" fill="lightgray" />
      </svg>
    </div>
  );
}

export default ExampleGraph;
