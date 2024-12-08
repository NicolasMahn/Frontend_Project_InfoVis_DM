import React, { useState, useEffect } from 'react';

const TypeFilter = ({ onFilterChange,  config}) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [types, setTypes] = useState([ ]);
    const [selectedType, setSelectedType] = useState('');
    const [prevConfig, setPrevConfig] = useState(null);

    useEffect(() => {
        if (config) {
            if (!hasRunOnce || config != prevConfig) {
                let types = config.types;
                setTypes(types);
                onFilterChange({type: types[0]});
                setSelectedType(types[0]);
                if (types) setHasRunOnce(true);
                setPrevConfig(config);
            } else {
                let typeKeys = Object.keys(types);
                if (typeKeys.length !== config.types.length && typeKeys.some((c) => !config.type?.includes(c))) {
                    setHasRunOnce(false);
                }
            }
        }
    }, [hasRunOnce, types, config, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedType(name);
        onFilterChange({ type: name });
    };


    return (
        <div>
            <b> Select the Data Type:</b>< br />
            {types.map((type) => (
                <label key={type}>
                    <input
                        type="radio"
                        name={type}
                        checked={type == selectedType}
                        onChange={handleCheckboxChange}
                    /> {type} <br />
                </label>
            ))}
            <br />
        </div>
    );
};

export default TypeFilter;