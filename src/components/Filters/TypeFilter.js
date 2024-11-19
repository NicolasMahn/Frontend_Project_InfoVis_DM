import React, { useState, useEffect } from 'react';

const TypeFilter = ({ onFilterChange,  config}) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [types, setTypes] = useState([ ]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        if (!hasRunOnce) {
            let types = config.types;
            setTypes(types);
            onFilterChange({type: types[0]});
            setSelectedType(types[0]);
            if (types) setHasRunOnce(true);
        } else {
            let typeKeys = Object.keys(types);
            if (typeKeys.length != config.types.length && typeKeys.some((c) => !config.type.includes(c))) {
                setHasRunOnce(false);
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
            {types.map((type) => (
                <label key={type}>
                    <input
                        type="radio"
                        name={type}
                        checked={type == selectedType}
                        onChange={handleCheckboxChange}
                    /> {type}
                </label>
            ))}
        </div>
    );
};

export default TypeFilter;