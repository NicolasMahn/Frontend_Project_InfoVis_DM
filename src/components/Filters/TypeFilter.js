import React, { useState, useEffect } from 'react';

const TypeFilter = ({ onFilterChange,  config}) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [types, setTypes] = useState([ ]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        if (config) {
            if (!hasRunOnce) {
                let types = config.types;
                setTypes(types);
                onFilterChange({type: types[0]});
                setSelectedType(types[0]);
                if (types) setHasRunOnce(true);
            } else {
                if (types.length !== config.types.length && types.some((c) => !config.type?.includes(c))) {
                    setHasRunOnce(false);
                }
            }
        }
    }, [hasRunOnce, types, config, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name, _ } = event.target;
        setSelectedType(name);
        onFilterChange({ type: name });
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span><b>Data Type:</b></span>
                <span 
                    style={{ 
                        marginLeft: '8px', 
                        cursor: 'pointer', 
                        position: 'relative', 
                        display: 'inline-block' 
                    }}
                    onMouseEnter={() => setHoveredTooltip('type')}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    onClick={() => setHoveredTooltip((prev) => prev === 'type' ? null : 'type')}
                >
                    ⓘ {/* Info icon */}
                    {hoveredTooltip === 'type' && (
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
                            Select Data Type as the basis for the graph.
                        </div>
                    )}
                </span>
            </div>
        <br />
            {Object.keys(type).map((type) => (
                <label key={type} style={{ display: 'block', marginBottom: '1px' }}>
                    <input
                            type="radio"
                            name={type}
                            checked={type === selectedType}
                            onChange={handleCheckboxChange}
                    />
                    {type} <br />
                </label>
            ))}
        </div>
    );
};

export default TypeFilter;