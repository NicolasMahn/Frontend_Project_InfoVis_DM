import React, { useState, useEffect } from 'react';

const TypeFilter = ({ onFilterChange, config }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        if (config) {
            if (!hasRunOnce) {
                const types = config.types;
                setTypes(types);
                onFilterChange({ type: types[0] });
                setSelectedType(types[0]);
                setHasRunOnce(true);
            }
        }
    }, [hasRunOnce, config, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name } = event.target;
        setSelectedType(name);
        onFilterChange({ type: name });
    };

    const toggleTooltip = () => setTooltipVisible(!tooltipVisible);
    const hideTooltip = () => setTooltipVisible(false);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <b>Data Type:</b>
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
                            The Data type describes the basis for the calculation of the graph (x-achis for purchases & locations).
                        </div>
                    )}
                </span>
            </div>
            {types.map((type) => (
                <label key={type}>
                    <input
                        type="radio"
                        name={type}
                        checked={selectedType === type}
                        onChange={handleCheckboxChange}
                    />
                    {type}<br/>
                </label>
            ))}
            <br/>
        </div>
    );
};

export default TypeFilter;
