import React, { useState, useEffect } from 'react';

const SortCategoriesAfter = ({ filterSettings, onFilterChange }) => {
  const [selectedSortOption, setSelectedSortOption] = useState('');

  useEffect(() => {
    if (!filterSettings || !filterSettings.categories) {
      return;
    }

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
  }, [filterSettings, selectedSortOption, onFilterChange]);

    
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedSortOption(value);
    onFilterChange({ sortCategory: value });
  };

  if (!filterSettings || !filterSettings.categories) {
    return null;
  }

  const selectedCategories = Object.keys(filterSettings.categories).filter(
    (category) => filterSettings.categories[category]
  );

  if (selectedCategories.length <= 1) {
    return null;
  }

  return (
    <div>
      <b>Sort Categories After: </b><br/>
      {selectedCategories.map((category) => (
        <label key={category}>
          <input
            type="radio"
            name="sortCategory"
            value={category}
            checked={selectedSortOption === category}
            onChange={handleRadioChange}
          />
          {category} <br/>
        </label> 
      ))}
      <br/>
    </div>
  );
};

export default SortCategoriesAfter;