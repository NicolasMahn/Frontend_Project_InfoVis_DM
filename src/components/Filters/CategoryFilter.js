import React, { useState, useEffect } from 'react';
import 'Filter.css';

const CategoryFilter = ({ onFilterChange,  config, filterSettings}) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [categories, setCheckboxes] = useState({ });

    useEffect(() => {
        if (!hasRunOnce) {
            let cs = config.categories;
            let newCategories = {};
            for (let c in cs)  {
                if (Object.keys(filterSettings.categories).includes(cs[c])) {
                    newCategories[cs[c]] = filterSettings.categories[cs[c]];
                } else {
                    newCategories[cs[c]] = true;
                }
            }
            setCheckboxes(newCategories);
            onFilterChange({categories: newCategories});
            if (categories) setHasRunOnce(true);
        } else {
            let categoryKeys = Object.keys(categories);
            if (categoryKeys.length != config.categories.length || categoryKeys.some((c) => !config.categories.includes(c))) {
                setHasRunOnce(false);
            }
        }
    }, [hasRunOnce, categories, config, onFilterChange]);

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
        <div className="category-filter">
          <span>
            <b>Categories:</b>
            <span className="tooltip-icon">?
              <span className="tooltip-text">Select categories to filter the data.</span>
            </span>
          </span>
          <br />
          {Object.keys(categories).map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                name={category}
                checked={categories[category]}
                onChange={handleCheckboxChange}
              />
              {category}
            </label>
          ))}
        </div>
      );
    };

export default CategoryFilter;