import React from 'react';
import defaultCookie from './defaultCookie.json'; // Import the defaultCookie.json file

const FilterBox = ({ filters, onFilterChange, filterSettings, config }) => {
  const handlePreselection = (preselectedFilters) => {
    // Wenden Sie die Preselection auf die Filter an
    onFilterChange(preselectedFilters);
  };

  // Filtern Sie die Preselections, die den aktuellen Graph als Parent haben
  const preselections = defaultCookie.filter(item => item.parent === config.graph);

  return (
    <div className="filter-box">
      {preselections.map(preselection => (
        <button key={preselection.id} onClick={() => handlePreselection(preselection.filterSettings)}>
          Load Preselection {preselection.title}
        </button>
      ))}
      {filters.map((FilterComponent, index) => (
        <FilterComponent key={index} onFilterChange={onFilterChange} filterSettings={filterSettings} config={config} />
      ))}
    </div>
  );
};

export default FilterBox;