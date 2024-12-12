import React, { useState, useEffect } from 'react';


const ExplanationBox = ({cookieData, handleGraphAndFilterChange}) => {
  const [hoveredGraph, setHoveredGraph] = useState(null);


  const loadGraph = (graph) => {
    console.log('Loading graph:', graph);
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
        {cookieData.filter(graph => graph.type === 'default_generic').map((graph) => (
          <div key={graph.id} className="graph-button-container" onMouseEnter={() => handleMouseEnter(graph)} onMouseLeave={handleMouseLeave}>
            <button
              className={`graph-button ${graph.selected ? 'selected' : ''}`}
              onClick={() => loadGraph(graph)}
            >
              {graph.title}
            </button>
            {hoveredGraph === graph.id && (
              <div className="dropdown">
                {cookieData.filter(child => child.parent === graph.id).map((child) => (
                  <button
                    key={child.id}
                    className={`graph-button child-button ${child.type === 'custom' ? 'custom' : ''}`}
                    onClick={() => loadGraph(child)}
                  >
                    {child.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplanationBox;
