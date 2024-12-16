import React, { useState, useEffect } from 'react';

const TimeFilter = ({ onFilterChange, config }) => {
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        if (config) {
            const times = config.times;
            setTimes(times);
            setSelectedTime(times[0]);
            onFilterChange({ time: times[0] });
        }
    }, [config, onFilterChange]);

    const handleRadioChange = (event) => {
        const { name } = event.target;
        setSelectedTime(name);
        onFilterChange({ time: name });
    };

    const toggleTooltip = () => setTooltipVisible(!tooltipVisible);
    const hideTooltip = () => setTooltipVisible(false);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <b>Select a Time Category:</b>
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
                            Tooltip for Time Filter
                        </div>
                    )}
                </span>
            </div>
            {times.map((time) => (
                <label key={time}>
                    <input
                        type="radio"
                        name={time}
                        checked={selectedTime === time}
                        onChange={handleRadioChange}
                    />
                    {time}
                </label>
            ))}
            <br/>
        </div>
    );
};

export default TimeFilter;
