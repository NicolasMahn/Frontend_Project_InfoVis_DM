import React from 'react';

const FilterBox = ({ filters, onFilterChange, filterSettings, config}) => {

  return (
    <div className="filter-box">
      {filters.map((FilterComponent, index) => (
        <FilterComponent key={index} onFilterChange={onFilterChange} filterSettings={filterSettings} config={config} />
      ))}
    </div>
  );
};

export default FilterBox;
