import React, { useState, useEffect } from 'react';


const ExplanationBox = ({buttonSettings, handleGraphAndFilterChange}) => {
  const [hoveredGraph, setHoveredGraph] = useState(null);


  const loadGraph = (graph) => {
    handleGraphAndFilterChange(graph);
  };
  
  const handleMouseEnter = (graph) => {
    setHoveredGraph(graph.id);
  };

  const handleMouseLeave = () => {
    setHoveredGraph(null);
  };

  return (
    <div className="navigation-box" style={{ textAlign: 'center' }}>
      <div>
        {buttonSettings.filter(graph => graph.type === 'default_generic').map((graph) => (
          <div key={graph.id} className="graph-button-container" onMouseEnter={() => handleMouseEnter(graph)} onMouseLeave={handleMouseLeave}>
            <button
              className={`graph-button ${graph.selected ? 'selected' : ''}`}
              onClick={() => loadGraph(graph)}
            >
              {graph.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplanationBox;
