import React from 'react';

const TimeFilter = () => {
  return (
    <div className="time-filter">
      <p>Select Time Period:</p>
      <label><input type="radio" name="time" /> 0-6 am</label>
      <label><input type="radio" name="time" /> 6-12 am</label>
      <label><input type="radio" name="time" /> 12-6 pm</label>
      <label><input type="radio" name="time" /> 6-12 pm</label>
      <label><input type="radio" name="time" /> Average day</label>
    </div>
  );
};

export default TimeFilter;
