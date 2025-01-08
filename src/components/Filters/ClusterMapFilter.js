import React, { useState } from 'react';
import legendImage from '../../data/location_clusters_legend.png'; // Import the legend image

const ClusterMapFilter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('filter3');

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    console.log(newFilter);
    onFilterChange({locationClusterFilter: newFilter});
  };

  return (
    <div>
      <h3>Select a Map:</h3>
      <div>
        <label>
          <input
            type="radio"
            value="filter1"
            checked={selectedFilter === 'filter1'}
            onChange={handleFilterChange}
          />
          Abila Street Map
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="filter2"
            checked={selectedFilter === 'filter2'}
            onChange={handleFilterChange}
          />
          Abila Street Map with identified Locations
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="filter3"
            checked={selectedFilter === 'filter3'}
            onChange={handleFilterChange}
          />
          Abila Street Map with identified Locations and Employee Meetingpoints
        </label>
      </div>
      {(selectedFilter === 'filter2' || selectedFilter === 'filter3') && (
        <div className="legend">
          <h3>Legend</h3>
          <img src={legendImage} alt="Legend" />
        </div>
      )}
    </div>
  );
};

export default ClusterMapFilter;