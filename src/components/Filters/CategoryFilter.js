import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange, config, filterSettings }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [categories, setCategories] = useState({});
    const [tooltipVisible, setTooltipVisible] = useState(false);

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
        onFilterChange({ categories: newCategories });
    };

    const toggleTooltip = () => setTooltipVisible(!tooltipVisible);
    const hideTooltip = () => setTooltipVisible(false);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <b>Categories:</b>
                <br/>
                <span
                    style={{ marginLeft: '8px', cursor: 'pointer' }}
                    onMouseEnter={toggleTooltip}
                    onMouseLeave={hideTooltip}
                    onClick={toggleTooltip}
                >
                    ⓘ
                    {tooltipVisible && (
                        <div style={{
                            position: 'absolute',
                            background: '#fff',
                            border: '1px solid #ccc',
                            padding: '8px',
                            borderRadius: '4px',
                            zIndex: 1000
                        }}>
                            The category describes the basis of the data (described through color in the graph).
                        </div>
                    )}
                </span>
            </div>
            {Object.keys(categories).map((category) => (
                <label key={category}>
                    <input
                        type="checkbox"
                        name={category}
                        checked={categories[category]}
                        onChange={handleCheckboxChange}
                    />
                    {category} <br/>
                </label>
            ))}
            <br/>
        </div>
    );
};

export default CategoryFilter;
