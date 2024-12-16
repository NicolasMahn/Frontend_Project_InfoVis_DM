import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange, config, filterSettings }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [categories, setCheckboxes] = useState({ });
    const [tooltips, setTooltips] = useState({}); // Individual tooltip states

    useEffect(() => {
        if (!hasRunOnce) {
            let cs = config.categories;
            let newCategories = {};
            for (let c in cs) {
                if (Object.keys(filterSettings.categories).includes(cs[c])) {
                    newCategories[cs[c]] = filterSettings.categories[cs[c]];
                } else {
                    newCategories[cs[c]] = true;
                }
            }
            setCheckboxes(newCategories);
            onFilterChange({ categories: newCategories });
            if (categories) setHasRunOnce(true);

            // Initialize tooltips state
            let newTooltips = {};
            for (let category of Object.keys(newCategories)) {
                newTooltips[category] = false;
            }
            setTooltips(newTooltips);
        } else {
            let categoryKeys = Object.keys(categories);
            if (categoryKeys.length !== config.categories.length || categoryKeys.some((c) => !config.categories.includes(c))) {
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

    const toggleTooltip = (category) => {
        setTooltips((prevTooltips) => ({
            ...prevTooltips,
            [category]: !prevTooltips[category],
        }));
    };

    const hideTooltip = (category) => {
        setTooltips((prevTooltips) => ({
            ...prevTooltips,
            [category]: false,
        }));
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span><b>Categories:</b></span>
            </div>
            <br />
            {Object.keys(categories).map((category) => (
                <div key={category} style={{ position: 'relative', marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>
                        <input
                            type="checkbox"
                            name={category}
                            checked={categories[category]}
                            onChange={handleCheckboxChange}
                        />
                        {category}
                    </label>
                    <span
                        style={{
                            marginLeft: '8px',
                            cursor: 'pointer',
                            position: 'relative',
                            display: 'inline-block',
                        }}
                        onMouseEnter={() => toggleTooltip(category)}
                        onMouseLeave={() => hideTooltip(category)}
                        onClick={() => toggleTooltip(category)}
                    >
                        ⓘ
                        {tooltips[category] && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '0',
                                    backgroundColor: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    zIndex: 1000,
                                }}
                            >
                                Tooltip for {category}
                            </div>
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CategoryFilter;
