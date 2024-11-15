import React from 'react';

const EmployeeFilter = ({ onFilterChange }) => {
    return (
        <div>
            <label>Employees:</label>
            <select>
                <option>Select employee</option>
                {/* Add options as needed */}
            </select>
        </div>
    );
};

export default EmployeeFilter;