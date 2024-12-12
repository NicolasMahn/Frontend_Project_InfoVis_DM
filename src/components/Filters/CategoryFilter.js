import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange, config, filterSettings }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [categories, setCheckboxes] = useState({ });
    const [hoveredTooltip, setHoveredTooltip] = useState(null);

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

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span><b>Categories:</b></span>
                <span 
                    style={{ 
                        marginLeft: '8px', 
                        cursor: 'pointer', 
                        position: 'relative', 
                        display: 'inline-block' 
                    }}
                    onMouseEnter={() => setHoveredTooltip('categories')}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    onClick={() => setHoveredTooltip((prev) => prev === 'categories' ? null : 'categories')}
                >
                    ⓘ {/* Info icon */}
                    {hoveredTooltip === 'categories' && (
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
                                zIndex: 1000 
                            }}
                        >
                            Select categories to filter the data.
                        </div>
                    )}
                </span>
            </div>
            <br />
            {Object.keys(categories).map((category) => (
                <label key={category} style={{ display: 'block', marginBottom: '4px' }}>
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
