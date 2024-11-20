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
            <b> Select a Time Categorie:</b>< br />
            {times.map((time) => (
                <label key={time}>
                    <input
                        type="radio"
                        name={time}
                        checked={time === selectedTime}
                        onChange={handleCheckboxChange}
                    /> {time} <br />
                </label>
            ))}
          <br />
        </div>
    );
};

export default TimeFilter;
