import React from 'react';

const SuspiciousActivityBox = ({ setSelectedGraph }) => {
  return (
    <div className="suspicious-activity-box">
      <button onClick={() => setSelectedGraph('ExampleGraph')}>Show Example Graph</button>
      <button onClick={() => setSelectedGraph('NumbPurchasesPerLocation')}>Show Number of Purchases Per Location</button>
      <button onClick={() => setSelectedGraph('ComparingPurchasesOfPairs')}>Show Number of Purchases Paired</button>
      <button>See more about the suspicious activities here</button>
    </div>
  );
};

export default SuspiciousActivityBox;
