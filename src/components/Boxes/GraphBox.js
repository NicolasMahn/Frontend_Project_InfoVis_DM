// src/components/GraphBox.js
import React from 'react';
import ExampleGraph from '../Graphs/ExampleGraph';
import TimeFilter from '../Filters/TimeFilter';

const GraphBox = () => {
  return (
    <div className="graph-box">
      <ExampleGraph>  </ExampleGraph>
      <TimeFilter />
    </div>
  );
};

export default GraphBox;
