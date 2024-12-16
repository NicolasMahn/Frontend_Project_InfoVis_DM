import React, { useState, useEffect } from 'react';

const TimeFilter = ({ onFilterChange, config }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [tooltips, setTooltips] = useState({}); // Individual tooltip states

    useEffect(() => {
        if (!hasRunOnce) {
            let times = config.times;
            setTimes(times);
            onFilterChange({ time: times[0] });
            setSelectedTime(times[0]);
            if (times) setHasRunOnce(true);

            // Initialize tooltips state
            let newTooltips = {};
            for (let time of times) {
                newTooltips[time] = false;
            }
            setTooltips(newTooltips);
        } else {
            let timeKeys = Object.keys(times);
            if (timeKeys.length !== config.times.length && timeKeys.some((c) => !config.times.includes(c))) {
                setHasRunOnce(false);
            }
        }
    }, [hasRunOnce, times, config, onFilterChange]);

    const handleCheckboxChange = (event) => {
        const { name } = event.target;
        setSelectedTime(name);
        onFilterChange({ time: name });
    };

    const toggleTooltip = (time) => {
        setTooltips((prevTooltips) => ({
            ...prevTooltips,
            [time]: !prevTooltips[time],
        }));
    };

    const hideTooltip = (time) => {
        setTooltips((prevTooltips) => ({
            ...prevTooltips,
            [time]: false,
        }));
    };

    return (
        <div>
            <b>Select a Time Category:</b><br />
            {times.map((time) => (
                <div key={time} style={{ position: 'relative', marginBottom: '8px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>
                        <input
                            type="radio"
                            name={time}
                            checked={time === selectedTime}
                            onChange={handleCheckboxChange}
                        />
                        {time}
                    </label>
                    <span
                        style={{
                            marginLeft: '8px',
                            cursor: 'pointer',
                            position: 'relative',
                            display: 'inline-block',
                        }}
                        onMouseEnter={() => toggleTooltip(time)}
                        onMouseLeave={() => hideTooltip(time)}
                        onClick={() => toggleTooltip(time)}
                    >
                        ⓘ
                        {tooltips[time] && (
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
                                Tooltip for {time}
                            </div>
                        )}
                    </span>
                </div>
            ))}
            <br />
        </div>
    );
};

export default TimeFilter;
