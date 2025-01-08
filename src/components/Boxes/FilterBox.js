import React, { useEffect, useState } from 'react';
import { use } from 'react';

const FilterBox = ({ filters, onFilterChange, filterSettings, config, handleGraphAndFilterChange, buttonSettings}) => {

  const [graph, setGraph] = useState(null);

  const loadGraph = (graph) => {
    handleGraphAndFilterChange(graph);
  };

  useEffect(() => {
    let graph = buttonSettings.find(button => button.selected === true);
    if (graph.parent != null) setGraph(buttonSettings.find(button => button.id === graph.parent));
    else setGraph(graph);
  }, [buttonSettings]);
    

  return (
    <div className="filter-box">
      
      <b style={{ fontSize: '20px' }}>Preselected Filters:</b>
      

      {buttonSettings.filter(child => graph != null && child.parent === graph.id).map((child) => (
        <React.Fragment key={child.id}>
          <p>
          <button onClick={() => loadGraph(child)} className={`graph-button child-button ${child.type === 'custom' ? 'custom' : ''}`}>
            {child.title}
          </button>
          </p>
        </React.Fragment>
      ))}
      <hr/>
      <br/>
      {filters.map((FilterComponent, index) => (
        <FilterComponent key={index} onFilterChange={onFilterChange} filterSettings={filterSettings} config={config} />
      ))}
      
    </div>
  );
};

export default FilterBox;
