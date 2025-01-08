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
        {(selectedFilter === 'filter3') && (
        <div className="employeecluster">
          <h3>Exmployee Clusters</h3>
          <span className="info-button">ⓘ
              <span className="info-tooltip">
                Cluster ID: 6<br/>
                Location: Coffee Chameleon<br/>
                Employees:<br/>
                • Linnea Bergen, Car ID: 6<br/>
                • Bertrand Ovan, Car ID: 29<br/>
                • Kanon Herrero, Car ID: 25<br/>
                <br/>
                Cluster ID: 7<br/>
                Location: Coffee Shack<br/>
                Employees:<br/>
                • Minke Mies, Car ID: 24<br/>
                • Nils Calixto, Car ID: 1<br/>
                <br/>
                Cluster ID: 8<br/>
                Location: Desafio Golf Course<br/>
                Employees:<br/>
                • Willem Vasco-Pais, Car ID: 35<br/>
                • Ada Campo-Corrente, Car ID: 10<br/>
                <br/>
                Cluster ID: 9<br/>
                Location: Frydo's Autosupply n' More<br/>
                Employees:<br/>
                • Loreto Bodrogi, Car ID: 15<br/>
                • Isia Vann, Car ID: 16<br/>
                • Inga Ferro, Car ID: 13<br/>
                • Hennie Osvaldo, Car ID: 21<br/>
                <br/>
                Cluster ID: 10<br/>
                Location: Guy's Gyros<br/>
                Employees:<br/>
                • Varja Lagos, Car ID: 23<br/>
                • Adra Nubarron, Car ID: 22<br/>
                • Felix Resumir, Car ID: 30<br/>
                <br/>
                Cluster ID: 11<br/>
                Location: Hallowed Grounds<br/>
                Employees:<br/>
                • Hideki Cocinaro, Car ID: 12<br/>
                • Birgitta Frente, Car ID: 18<br/>
                • Marin Onda, Car ID: 26<br/>
                • Lidelse Dedos, Car ID: 14<br/>
                • Kare Orilla, Car ID: 27<br/>
                • Lucas Alcazar, Car ID: 8<br/>
                <br/>
                Cluster ID: 12<br/>
                Location: Ouzeri Elian<br/>
                Employees:<br/>
                • Elsa Orilla, Car ID: 7<br/>
                • Brand Tempestad, Car ID: 33<br/>
                • Stenig Fusil, Car ID: 20<br/>
                • Vira Frente, Car ID: 19<br/>
                • Bertrand Ovan, Car ID: 29<br/>
                <br/>
                Cluster ID: 13<br/>
                Location: Roberts and Sons<br/>
              </span>
            </span>
        </div>
      )}
    </div>
  );
};

export default ClusterMapFilter;