import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange, config, filterSettings }) => {
    const [categories, setCategories] = useState({});
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        const categoryState = config.categories.reduce((acc, category) => {
            acc[category] = filterSettings.categories[category] ?? true;
            return acc;
        }, {});
        setCategories(categoryState);
        onFilterChange({ categories: categoryState });
    }, [config, filterSettings, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const newCategories = { ...categories, [name]: checked };
        setCategories(newCategories);
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
