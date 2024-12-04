import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import defaultCookieJson from './defaultCookie.json';

const ExplanationBox = ({filterSettings, selectedGraph, handleGraphAndFilterChange}) => {
  const [savedGraphs, setSavedGraphs] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Check if the cookie exists
    const cookieValue = Cookies.get('savesCookie');
    
    if (cookieValue) {
      try {
        const parsedCookie = JSON.parse(cookieValue);
        if (Array.isArray(parsedCookie)) {
          console.log('Cookie has been parsed:', parsedCookie);
          setSavedGraphs(parsedCookie);
        } else {
          console.error('Cookie is not an array:', parsedCookie);
        }
      } catch (error) {
        console.error('Failed to parse cookie:', error);
      }
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

  const saveCurrentGraph = () => {
    const newGraph = {
      id: savedGraphs.length + 1,
      title: title,
      graph: selectedGraph,
      filterSettings: filterSettings,
      description: 'This is a description',
    };
    const updatedGraphs = [...savedGraphs, newGraph];
    setSavedGraphs(updatedGraphs);
    Cookies.set('savesCookie', JSON.stringify(updatedGraphs), { expires: 7 });
  };

  const loadGraph = (graph) => {
    console.log('Loading graph:', graph);
    handleGraphAndFilterChange(graph.graph, graph.filterSettings);
  };

  const deleteCookie = () => {
    Cookies.remove('savesCookie');
    setSavedGraphs([]);
    console.log('Cookie has been deleted.');

    // Use the JSON file
    const defaultCookie = defaultCookieJson;

    // Ensure defaultCookie is an array
    if (Array.isArray(defaultCookie)) {
      // Set the cookie if it doesn't exist
      Cookies.set('savesCookie', JSON.stringify(defaultCookie), { expires: 30 });
      setSavedGraphs(defaultCookie);
      console.log('Default cookie has been set.');
    } else {
      console.error('Default cookie is not an array:', defaultCookie);
    }
  };

  return (
    <div className="explanation-box" style={{ textAlign: 'center' }}>
      <h3 className="header">Explanation to shown Graphs and Project</h3>

      <div>
        {savedGraphs.map((graph) => (
          <button key={graph.id} onClick={() => loadGraph(graph)}>
            {graph.title}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter a title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={saveCurrentGraph}>Save Current Graph</button>
      <button onClick={deleteCookie}>Delete Saved Graphs</button>
    </div>
  );
};

export default ExplanationBox;
