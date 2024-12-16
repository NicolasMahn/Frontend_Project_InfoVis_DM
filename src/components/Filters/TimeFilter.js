import React, { useState, useEffect } from 'react';

const TimeFilter = ({ onFilterChange, config }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (!hasRunOnce) {
            let times = config.times;
            setTimes(times);
            onFilterChange({ time: times[0] });
            setSelectedTime(times[0]);
            if (times) setHasRunOnce(true);
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

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span><b>Time Category:</b></span>
                <span 
                    style={{ 
                        marginLeft: '8px', 
                        cursor: 'pointer', 
                        position: 'relative', 
                        display: 'inline-block' 
                    }}
                    onMouseEnter={() => setHoveredTooltip('time')}
                    onMouseLeave={() => setHoveredTooltip(null)}
                    onClick={() => setHoveredTooltip((prev) => prev === 'time' ? null : 'time')}
                >
                    ⓘ {/* Info icon */}
                    {hoveredTooltip === 'time' && (
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
                            Select a Time Category as the basis for the graph.
                        </div>
                    )}
                </span>
            </div>
        <br />
            {Object.keys(time).map((time) => (
                <label key={time} style={{ display: 'block', marginBottom: '1px' }}>
                    <input
                        type="radio"
                        name={time}
                        checked={time === selectedTime}
                        onChange={handleCheckboxChange}
                        /> {time} <br />
                </label>
            ))}
            <br/>
        </div>
    );
};
export default TimeFilter;
