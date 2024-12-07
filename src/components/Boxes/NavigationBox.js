import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import defaultCookieJson from './defaultCookie.json';

const ExplanationBox = ({savedGraphs, setSavedGraphs, title, setTitle, filterSettings, selectedGraph, handleGraphAndFilterChange}) => {
  const [hoveredGraph, setHoveredGraph] = useState(null);

  useEffect(() => {
    // Check if the cookie exists
    const cookieValue = Cookies.get('savesCookie');
    let existingGraphs = [];

    if (cookieValue) {
      try {
        const parsedCookie = JSON.parse(cookieValue);
        if (Array.isArray(parsedCookie)) {
          // console.log('Cookie has been parsed:', parsedCookie);
          existingGraphs = parsedCookie;
        } else {
          console.error('Cookie is not an array:', parsedCookie);
        }
      } catch (error) {
        console.error('Failed to parse cookie:', error);
      }

      // Merge default cookie items with existing saved cookies
      const mergedGraphs = [...existingGraphs];
      defaultCookieJson.forEach(defaultItem => {
        if (!mergedGraphs.some(item => item.id === defaultItem.id)) {
          mergedGraphs.push(defaultItem);
        }
      });

      // Update the client cookie with the merged result
      Cookies.set('savesCookie', JSON.stringify(mergedGraphs), { expires: 7 });
      setSavedGraphs(mergedGraphs);
    } else {
      // Use the JSON file
      const defaultCookie = defaultCookieJson;

      // Ensure defaultCookie is an array
      if (Array.isArray(defaultCookie)) {
        // Set the cookie if it doesn't exist
        Cookies.set('savesCookie', JSON.stringify(defaultCookie), { expires: 7 });
        setSavedGraphs(defaultCookie);
        console.log('Default cookie has been set.');
      } else {
        console.error('Default cookie is not an array:', defaultCookie);
      }
    }
  }, []);

  const loadGraph = (graph) => {
    console.log('Loading graph:', graph);
    const updatedSavedGraphs = savedGraphs.map(g => ({ ...g, selected: g.id === graph.id || g.id === graph.parent ? true : false }));

    setSavedGraphs(updatedSavedGraphs);
    handleGraphAndFilterChange(graph.graph, graph.filterSettings);
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
        {savedGraphs.filter(graph => graph.type === 'default_generic').map((graph) => (
          <div key={graph.id} className="graph-button-container" onMouseEnter={() => handleMouseEnter(graph)} onMouseLeave={handleMouseLeave}>
            <button
              className={`graph-button ${graph.selected ? 'selected' : ''}`}
              onClick={() => loadGraph(graph)}
            >
              {graph.title}
            </button>
            {hoveredGraph === graph.id && (
              <div className="dropdown">
                {savedGraphs.filter(child => child.parent === graph.id).map((child) => (
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
