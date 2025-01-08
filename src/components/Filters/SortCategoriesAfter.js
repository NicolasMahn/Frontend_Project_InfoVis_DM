import React, { useState, useEffect } from 'react';

const SortCategoriesAfter = ({ filterSettings, onFilterChange }) => {
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
 

    const selectedCategories = Object.keys(filterSettings.categories).filter(
      (category) => filterSettings.categories[category]
    );

    setSelectedCategories(selectedCategories);

    if (selectedCategories.length === 1) {
      setSelectedSortOption(selectedCategories[0]);
      onFilterChange({ sortCategory: selectedCategories[0] });
    } else if (!selectedCategories.includes(selectedSortOption)) {
        setSelectedSortOption(selectedCategories[0]);
        onFilterChange({ sortCategory: selectedCategories[0] });
    } else {
      setSelectedSortOption(filterSettings.sortCategory);
    }
  }, [filterSettings, onFilterChange]);

    
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedSortOption(value);
    onFilterChange({ sortCategory: value });
  };

 


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