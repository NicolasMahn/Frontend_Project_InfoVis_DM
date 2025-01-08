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
          <span className="info-point" data-tooltip="Cluster ID: 1
Location: Albert's Fine Clothing
Employees:
•	Gustav Cazar, Car ID: 9
•	Orhan Strum, Car ID: 32
•	Edvard Vann, Car ID: 34
•	Nils Calixto, Car ID: 1 </br>
Cluster ID: 2
Location: Bean There Done That
Employees:
•	Vira Frente, Car ID: 19
•	Axel Calzas, Car ID: 11
•	Felix Balas, Car ID: 3
•	Lars Azada, Car ID: 2 </br>
Cluster ID: 3
Location: Brew've Been Served
Employees:
•	Edvard Vann, Car ID: 34
•	Sven Flecha, Car ID: 17
•	Isia Vann, Car ID: 16
•	Stenig Fusil, Car ID: 20
•	Hennie Osvaldo, Car ID: 21
•	Inga Ferro, Car ID: 13
•	Brand Tempestad, Car ID: 33
•	Minke Mies, Car ID: 24
•	Varja Lagos, Car ID: 23
•	Felix Resumir, Car ID: 30
•	Loreto Bodrogi, Car ID: 15
•	Adra Nubarron, Car ID: 22 </br>
Cluster ID: 4
Location: Carly's Coffee
Employees:
•	Linnea Bergen, Car ID: 6
•	Inga Ferro, Car ID: 13
•	Kare Orilla, Car ID: 27
•	Lucas Alcazar, Car ID: 8</br>
Cluster ID: 5
Location: Chostus Hotel
Employees:
•	Brand Tempestad, Car ID: 33
•	Elsa Orilla, Car ID: 7</br>
Cluster ID: 6
Location: Coffee Chameleon
Employees:
•	Linnea Bergen, Car ID: 6
•	Bertrand Ovan, Car ID: 29
•	Kanon Herrero, Car ID: 25</br>
Cluster ID: 7
Location: Coffee Shack
Employees:
•	Minke Mies, Car ID: 24
•	Nils Calixto, Car ID: 1</br>
Cluster ID: 8
Location: Desafio Golf Course
Employees:
•	Willem Vasco-Pais, Car ID: 35
•	Ada Campo-Corrente, Car ID: 10</br>
Cluster ID: 9
Location: Frydo's Autosupply n' More
Employees:
•	Loreto Bodrogi, Car ID: 15
•	Isia Vann, Car ID: 16
•	Inga Ferro, Car ID: 13
•	Hennie Osvaldo, Car ID: 21</br>
Cluster ID: 10
Location: Guy's Gyros
Employees:
•	Varja Lagos, Car ID: 23
•	Adra Nubarron, Car ID: 22
•	Felix Resumir, Car ID: 30</br>
Cluster ID: 11
Location: Hallowed Grounds
Employees:
•	Hideki Cocinaro, Car ID: 12
•	Birgitta Frente, Car ID: 18
•	Marin Onda, Car ID: 26
•	Lidelse Dedos, Car ID: 14
•	Kare Orilla, Car ID: 27
•	Lucas Alcazar, Car ID: 8</br>
Cluster ID: 12
Location: Ouzeri Elian
Employees:
•	Elsa Orilla, Car ID: 7
•	Brand Tempestad, Car ID: 33
•	Stenig Fusil, Car ID: 20
•	Vira Frente, Car ID: 19
•	Bertrand Ovan, Car ID: 29</br>
Cluster ID: 13
Location: Roberts and Sons
Employees:
•	Isia Vann, Car ID: 16
•	Adra Nubarron, Car ID: 22
•	Hideki Cocinaro, Car ID: 12
•	Ingrid Barranco, Car ID: 4
">ⓘ</span>
        </div>
      )}
    </div>
  );
};

export default ClusterMapFilter;