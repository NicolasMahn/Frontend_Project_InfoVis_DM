import React, { useState, useEffect } from 'react';

const TypeFilter = ({ onFilterChange, config }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [tooltips, setTooltips] = useState({}); // Individual tooltip states

    useEffect(() => {
        if (config) {
            if (!hasRunOnce) {
                let types = config.types;
                setTypes(types);
                onFilterChange({ type: types[0] });
                setSelectedType(types[0]);
                if (types) setHasRunOnce(true);

                // Initialize tooltips state
                let newTooltips = {};
                for (let type of types) {
                    newTooltips[type] = false;
                }
                setTooltips(newTooltips);
            } else {
                if (types.length !== config.types.length && types.some((c) => !config.types?.includes(c))) {
                    setHasRunOnce(false);
                }
            }
        }
    }, [hasRunOnce, types, config, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name } = event.target;
        setSelectedType(name);
        onFilterChange({ type: name });
    };

    const toggleTooltip = (type) => {
        setTooltips((prevTooltips) => ({
            ...prevTooltips,
            [type]: !prevTooltips[type],
        }));
    };

    const hideTooltip = (type) => {
        setTooltips((prevTooltips) => ({
            ...prevTooltips,
            [type]: false,
        }));
    };

    return (
        <div>
            <b>Select the Data Type:</b><br />
            {types.map((type) => (
                <div key={type} style={{ position: 'relative', marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>
                        <input
                            type="radio"
                            name={type}
                            checked={type === selectedType}
                            onChange={handleCheckboxChange}
                        />
                        {type}
                    </label>
                    <span
                        style={{
                            marginLeft: '8px',
                            cursor: 'pointer',
                            position: 'relative',
                            display: 'inline-block',
                        }}
                        onMouseEnter={() => toggleTooltip(type)}
                        onMouseLeave={() => hideTooltip(type)}
                        onClick={() => toggleTooltip(type)}
                    >
                        ⓘ
                        {tooltips[type] && (
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
                                Tooltip for {type}
                            </div>
                        )}
                    </span>
                </div>
            ))}
            <br />
        </div>
    );
};

export default TypeFilter;
