import React, { useState, useEffect } from 'react';

const SortCategoriesAfter = ({ filterSettings, onFilterChange }) => {
  const [selectedSortOption, setSelectedSortOption] = useState('');

  useEffect(() => {
    const selectedCategories = Object.keys(filterSettings.categories).filter(
        (category) => filterSettings.categories[category]
      );

      if (selectedCategories.length === 1) {
        setSelectedSortOption(selectedCategories[0]);
        onFilterChange({ sortCategory: selectedCategories[0] });
      } else if (selectedCategories.length > 1) {
        if (!selectedCategories.includes(selectedSortOption)) {
          setSelectedSortOption(selectedCategories[0]);
          onFilterChange({ sortCategory: selectedCategories[0] });
        }
      }
    }, [filterSettings.categories, selectedSortOption, onFilterChange]);

    
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedSortOption(value);
    onFilterChange({ sortCategory: value });
  };

  const selectedCategories = Object.keys(filterSettings.categories).filter(
    (category) => filterSettings.categories[category]
  );

  if (selectedCategories.length <= 1) {
    return null;
  }

  const possibleCategoryLabels = {
    creditcard: 'Credit Card', 
    loyaltycard: 'Loyalty Card',
    carsInArea: 'Cars in the Area'};


  return (
    <div>
      <b>Sort Categories After: </b>
      {selectedCategories.map((category) => (
        <label key={category}>
          <input
            type="radio"
            name="sortCategory"
            value={category}
            checked={selectedSortOption === category}
            onChange={handleRadioChange}
          />
          {possibleCategoryLabels[category]} &nbsp;
        </label> 
      ))}
    </div>
  );
};

export default SortCategoriesAfter;