import React from 'react';

const FilterBox = ({ filters, onFilterChange, filterSettings}) => {
    return (
        <div className="filter-box">
            {filters.map((FilterComponent, index) => (
            <FilterComponent key={index} onFilterChange={onFilterChange} filterSettings={filterSettings}/>
            ))}
        </div>
    );
};

export default FilterBox;
