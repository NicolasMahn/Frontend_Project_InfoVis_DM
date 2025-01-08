import React, { useState, useEffect } from 'react';

const ExplanationBox = ({cookieData, deleteCookie, saveCookie, setCookieData, title, setTitle, filterSettings, selectedGraph, handleGraphAndFilterChange}) => {

  const saveCurrentGraph = () => {
    const newGraph = {
      id: cookieData.length + 1,
      type: "custom",
      parent: cookieData.find(graph => graph.graph === selectedGraph && graph.type === "defaul_generic")?.id,
      selected: true,
      title: title,
      graph: selectedGraph,
      filterSettings: filterSettings,
      description: 'This is a description',
    };

    const updatedSavedGraphs = cookieData.map(graph => ({ ...graph, selected: false }));
    const updatedGraphs = [...updatedSavedGraphs, newGraph];
    setCookieData(updatedGraphs);
    saveCookie(updatedGraphs);
  };

  const loadGraph = (graph) => {
    handleGraphAndFilterChange(graph.graph, graph.filterSettings);
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
