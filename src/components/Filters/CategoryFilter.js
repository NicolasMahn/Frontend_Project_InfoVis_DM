import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [categories, setCheckboxes] = useState({
      creditcard: true,
      loyaltycard: true,
      carsInArea: true,
    });

    useEffect(() => {
        if (!hasRunOnce) {
            onFilterChange({categories: categories});
            setHasRunOnce(true);
        }
    }, [hasRunOnce, categories, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
            setCheckboxes((prevCheckboxes) => ({
                ...prevCheckboxes,
                [name]: checked,
        }));
        const newCategories = { ...categories, [name]: checked };
        onFilterChange({ categories: newCategories
        });
    };


    return (
<div>
      <label>
        <input
          type="checkbox"
          name="creditcard"
          checked={categories.creditcard}
          onChange={handleCheckboxChange}
        /> Creditcard
      </label>
      <label>
        <input
          type="checkbox"
          name="loyaltycard"
          checked={categories.loyaltycard}
          onChange={handleCheckboxChange}
        /> Loyaltycard
      </label>
      <label>
        <input
          type="checkbox"
          name="carsInArea"
          checked={categories.carsInArea}
          onChange={handleCheckboxChange}
        /> Cars in area
      </label>
    </div>
    );
};

export default CategoryFilter;