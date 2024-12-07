import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import defaultCookieJson from './defaultCookie.json';
import { type } from '@testing-library/user-event/dist/type';

const ExplanationBox = ({savedGraphs, setSavedGraphs, title, setTitle, filterSettings, selectedGraph, handleGraphAndFilterChange}) => {

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
      type: "custom",
      parent: savedGraphs.find(graph => graph.graph === selectedGraph && graph.type === "defaul_generic")?.id,
      selected: true,
      title: title,
      graph: selectedGraph,
      filterSettings: filterSettings,
      description: 'This is a description',
    };

    const updatedSavedGraphs = savedGraphs.map(graph => ({ ...graph, selected: false }));
    const updatedGraphs = [...updatedSavedGraphs, newGraph];
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
