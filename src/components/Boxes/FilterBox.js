import React from 'react';

const FilterBox = ({ filters, onFilterChange, filterSettings, config, buttonSettings }) => {
  const handlePreselection = (preselectedFilters) => {
    // Apply the preselection to the filters
    onFilterChange(preselectedFilters);
  };

  // Filter the preselections that have the current graph as parent
  const preselections = buttonSettings.filter(item => item.parent === config.graph);

  return (
    <div className="filter-box">
      {preselections.length > 0 && (
        <div className="preselection-buttons">
          {preselections.map(preselection => (
            <button key={preselection.id} onClick={() => handlePreselection(preselection.filterSettings)}>
              Load Preselection: {preselection.title}
            </button>
          ))}
        </div>
      )}
      {filters.map((FilterComponent, index) => (
        <FilterComponent key={index} onFilterChange={onFilterChange} filterSettings={filterSettings} config={config} />
      ))}
    </div>
  );
};

export default FilterBox;
