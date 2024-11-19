import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange,  config}) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [categories, setCheckboxes] = useState({ });

    useEffect(() => {
        if (!hasRunOnce) {
            let cs = config.categories;
            let newCategories = {};
            for (let c in cs)  newCategories[cs[c]] = true;
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
    <div>
        {Object.keys(categories).map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              name={category}
              checked={categories[category]}
              onChange={handleCheckboxChange}
            /> {category}
          </label>
        ))}
    </div>
    );
};

export default CategoryFilter;