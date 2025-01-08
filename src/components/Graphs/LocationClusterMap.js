import React, { useState } from 'react';
import graph1 from '../../data/abila_map.png';
import graph2 from '../../data/abila_map_location_cluster.png';
import graph3 from '../../data/abila_map_location_employee_cluster.png';

const LocationClusterMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('filter3');

  const allGraphs = {
    filter1: [
      { src: graph1, title: 'Abila Street Map' },
    ],
    filter2: [
      { src: graph2, title: 'Abila Street Map with identified Locations' },
    ],
    filter3: [
      { src: graph3, title: 'Abila Street Map with identified Locations and Employee Meetingpoints' },
    ],
  };

  return (
      <div className="center-content">
        {allGraphs[selectedFilter].map((graph, index) => (
          <div key={index} className="center-item">
            <h2 className="title">{graph.title}</h2>
            <img className="image" src={graph.src} alt={graph.title} />
          </div>
        ))}
      </div>
    
  );
};

export default LocationClusterMap;