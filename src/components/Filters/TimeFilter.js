import React, { useState, useEffect } from 'react';

const TimeFilter = ({ onFilterChange, config }) => {
    const [hasRunOnce, setHasRunOnce] = useState(false);
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);

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
                <b>Time Category:</b>
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
                            The time describes in which way the data is grouped. <br/> 
                            Timeline: 06/01/2014 - 16/01/2014 <br/> 
                            Average Day: Calculation of the mean average day (from the whole timeline). <br/>
                            Average Work Day: Calculation of the mean average work day (Monday - Friday). <br/> 
                            Average Weekend Day: Calculation of the mean average weekend day (Saturday & Sunday). <br/>
                            Average Week: Calculation of the mean average week (Monday - Sunday). <br/>
                        </div>
                    )}
                </span>
            </div>
            {times.map((time) => (
                <label key={time}>
                    <input
                        type="radio"
                        name={time}
                        checked={time === selectedTime}
                        onChange={handleRadioChange}
                    />
                    {time}<br/>
                </label>
            ))}
            <br/>
        </div>
    );
};

export default TimeFilter;
