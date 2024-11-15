import React from 'react';

const FilterBox = ({ filters, onFilterChange }) => {
    return (
        <div className="filter-box">
            {filters.map((FilterComponent, index) => (
            <FilterComponent key={index} onFilterChange={onFilterChange}/>
            ))}
        </div>
    );
};

export default FilterBox;
