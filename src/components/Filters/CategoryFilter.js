import React from 'react';

const CategoryFilter = ({ onFilterChange }) => {
    return (
        <div>
            <label><input type="checkbox" /> Creditcard</label>
            <label><input type="checkbox" /> Loyaltycard</label>
            <label><input type="checkbox" /> Cars in area</label>
        </div>
    );
};

export default CategoryFilter;