import React, { useState, useEffect } from 'react';

const TypeFilter = ({ onFilterChange, config, filterSettings }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [dataTypeDescription, setDataTypeDescription] = useState('The Data type describes the basis for the calculation of the graph (x-achis for purchases & locations).');

    useEffect(() => {
        if (config) {
            if (!hasRunOnce) {
                const types = config.types;
                if (config.dataTypeDescription != undefined) {
                    setDataTypeDescription(config.dataTypeDescription);
                } else {
                    setDataTypeDescription('The Data type describes the basis for the calculation of the graph (x-achis for purchases & locations).');
                }
                setTypes(types);
                onFilterChange({ type: types[0] });
                setSelectedType(types[0]);
                setHasRunOnce(true);
            }else {
                if (JSON.stringify(types) !== JSON.stringify(config.types)) {
                    setHasRunOnce(false);
                }
            }
        }
    }, [hasRunOnce, types, config, onFilterChange]);
        
    useEffect(() => {
        if (filterSettings && filterSettings.type !== selectedType) {
            setSelectedType(filterSettings.type);
        }
    }, [filterSettings, selectedType]);

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
                            <span dangerouslySetInnerHTML={{ __html: dataTypeDescription }} />
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
                    {type} <br/>
                </label>
            ))}
            <br/>
        </div>
    );
};

export default TypeFilter;
