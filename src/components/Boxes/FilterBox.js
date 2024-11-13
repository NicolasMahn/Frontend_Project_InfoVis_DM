// src/components/FilterBox.js
import React from 'react';

const FilterBox = () => {
  return (
    <div className="filter-box">
      <h3 className="header">Available Filters</h3>
      <div>
        <label>Locations:</label>
        <select>
          <option>Select location</option>
          {/* Add options as needed */}
        </select>
      </div>
      <div>
        <label>Employees:</label>
        <select>
          <option>Select employee</option>
          {/* Add options as needed */}
        </select>
      </div>
      <h4>Total number of:</h4>
      <label><input type="checkbox" /> Creditcard</label>
      <label><input type="checkbox" /> Loyaltycard</label>
      <label><input type="checkbox" /> Cars in area</label>
    </div>
  );
};

export default FilterBox;
