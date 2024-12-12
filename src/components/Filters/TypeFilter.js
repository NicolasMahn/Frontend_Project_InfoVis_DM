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
            <b> Select the Data Type:</b>< br />
            {types.map((type) => (
                <label key={type}>
                    <input
                        type="radio"
                        name={type}
                        checked={type === selectedType}
                        onChange={handleCheckboxChange}
                    /> {type} <br />
                </label>
            ))}
            <br />
        </div>
    );
};

export default TypeFilter;