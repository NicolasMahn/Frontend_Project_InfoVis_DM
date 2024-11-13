import React from 'react';

const FilterBox = ({ filters }) => {
    return (
        <div className="filter-box">
            {filters.map((FilterComponent, index) => (
            <FilterComponent key={index} />
            ))}
        </div>
    );
};

export default FilterBox;
