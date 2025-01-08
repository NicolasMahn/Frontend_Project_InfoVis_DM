import React, { useState } from 'react';
import legendImage from '../../data/location_clusters_legend.png'; // Import the legend image

const ClusterMapFilter = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('filter3');
  const [tooltipVisible, setTooltipVisible] = useState({});

  const toggleTooltip = (id) => {
    setTooltipVisible(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const hideTooltip = (id) => {
    setTooltipVisible(prevState => ({
      ...prevState,
      [id]: false
    }));
  };

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
      <div className="filter-container">
      {(selectedFilter === 'filter2' || selectedFilter === 'filter3') && (
        <div className="legend">
          <h3>Legend</h3>
          <img src={legendImage} alt="Legend" />
        </div>
      )}
        {(selectedFilter === 'filter3') && (
        <div className="employeecluster">
        <h3>Employee Clusters</h3>
      
        <div>
          Cluster ID: 1
          <span
            style={{ marginLeft: '8px', cursor: 'pointer' }}
            onMouseEnter={() => toggleTooltip(1)}
            onMouseLeave={() => hideTooltip(1)}
            onClick={() => toggleTooltip(1)}
          >
            ⓘ
            {tooltipVisible[1] && (
              <div
                style={{
                  position: 'absolute',
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}
              >
                <ul>
                  <li>Gustav Cazar, Car ID: 9</li>
                  <li>Orhan Strum, Car ID: 32</li>
                  <li>Edvard Vann, Car ID: 34</li>
                  <li>Nils Calixto, Car ID: 1</li>
                </ul>
              </div>
            )}
          </span>
        </div>
      
        <div>
          Cluster ID: 2
          <span
            style={{ marginLeft: '8px', cursor: 'pointer' }}
            onMouseEnter={() => toggleTooltip(2)}
            onMouseLeave={() => hideTooltip(2)}
            onClick={() => toggleTooltip(2)}
          >
            ⓘ
            {tooltipVisible[2] && (
              <div
                style={{
                  position: 'absolute',
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}
              >
                <ul>
                  <li>Vira Frente, Car ID: 19</li>
                  <li>Axel Calzas, Car ID: 11</li>
                  <li>Felix Balas, Car ID: 3</li>
                  <li>Lars Azada, Car ID: 2</li>
                </ul>
              </div>
            )}
          </span>
        </div>
      
        <div>
          Cluster ID: 3
          <span
            style={{ marginLeft: '8px', cursor: 'pointer' }}
            onMouseEnter={() => toggleTooltip(3)}
            onMouseLeave={() => hideTooltip(3)}
            onClick={() => toggleTooltip(3)}
          >
            ⓘ
            {tooltipVisible[3] && (
              <div
                style={{
                  position: 'absolute',
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '8px',
                  borderRadius: '4px',
                  zIndex: 1000,
                }}
              >
                <ul>
                  <li>Edvard Vann, Car ID: 34</li>
                  <li>Sven Flecha, Car ID: 17</li>
                  <li>Isia Vann, Car ID: 16</li>
                  <li>Stenig Fusil, Car ID: 20</li>
                  <li>Hennie Osvaldo, Car ID: 21</li>
                  <li>Inga Ferro, Car ID: 13</li>
                  <li>Brand Tempestad, Car ID: 33</li>
                  <li>Minke Mies, Car ID: 24</li>
                  <li>Varja Lagos, Car ID: 23</li>
                  <li>Felix Resumir, Car ID: 30</li>
                  <li>Loreto Bodrogi, Car ID: 15</li>
                  <li>Adra Nubarron, Car ID: 22</li>
                </ul>
              </div>
            )}
          </span>
        </div>
        {/* Cluster 4 */}
  <div>
    Cluster ID: 4
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(4)}
      onMouseLeave={() => hideTooltip(4)}
      onClick={() => toggleTooltip(4)}
    >
      ⓘ
      {tooltipVisible[4] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Linnea Bergen, Car ID: 6</li>
            <li>Inga Ferro, Car ID: 13</li>
            <li>Kare Orilla, Car ID: 27</li>
            <li>Lucas Alcazar, Car ID: 8</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 5 */}
  <div>
    Cluster ID: 5
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(5)}
      onMouseLeave={() => hideTooltip(5)}
      onClick={() => toggleTooltip(5)}
    >
      ⓘ
      {tooltipVisible[5] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Brand Tempestad, Car ID: 33</li>
            <li>Elsa Orilla, Car ID: 7</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 6 */}
  <div>
    Cluster ID: 6
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(6)}
      onMouseLeave={() => hideTooltip(6)}
      onClick={() => toggleTooltip(6)}
    >
      ⓘ
      {tooltipVisible[6] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Linnea Bergen, Car ID: 6</li>
            <li>Bertrand Ovan, Car ID: 29</li>
            <li>Kanon Herrero, Car ID: 25</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 7 */}
  <div>
    Cluster ID: 7
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(7)}
      onMouseLeave={() => hideTooltip(7)}
      onClick={() => toggleTooltip(7)}
    >
      ⓘ
      {tooltipVisible[7] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Minke Mies, Car ID: 24</li>
            <li>Nils Calixto, Car ID: 1</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 8 */}
  <div>
    Cluster ID: 8
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(8)}
      onMouseLeave={() => hideTooltip(8)}
      onClick={() => toggleTooltip(8)}
    >
      ⓘ
      {tooltipVisible[8] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Willem Vasco-Pais, Car ID: 35</li>
            <li>Ada Campo-Corrente, Car ID: 10</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 9 */}
  <div>
    Cluster ID: 9
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(9)}
      onMouseLeave={() => hideTooltip(9)}
      onClick={() => toggleTooltip(9)}
    >
      ⓘ
      {tooltipVisible[9] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Loreto Bodrogi, Car ID: 15</li>
            <li>Isia Vann, Car ID: 16</li>
            <li>Inga Ferro, Car ID: 13</li>
            <li>Hennie Osvaldo, Car ID: 21</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 10 */}
  <div>
    Cluster ID: 10
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(10)}
      onMouseLeave={() => hideTooltip(10)}
      onClick={() => toggleTooltip(10)}
    >
      ⓘ
      {tooltipVisible[10] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Varja Lagos, Car ID: 23</li>
            <li>Adra Nubarron, Car ID: 22</li>
            <li>Felix Resumir, Car ID: 30</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 11 */}
  <div>
    Cluster ID: 11
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(11)}
      onMouseLeave={() => hideTooltip(11)}
      onClick={() => toggleTooltip(11)}
    >
      ⓘ
      {tooltipVisible[11] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Hideki Cocinaro, Car ID: 12</li>
            <li>Birgitta Frente, Car ID: 18</li>
            <li>Marin Onda, Car ID: 26</li>
            <li>Lidelse Dedos, Car ID: 14</li>
            <li>Kare Orilla, Car ID: 27</li>
            <li>Lucas Alcazar, Car ID: 8</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 12 */}
  <div>
    Cluster ID: 12
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(12)}
      onMouseLeave={() => hideTooltip(12)}
      onClick={() => toggleTooltip(12)}
    >
      ⓘ
      {tooltipVisible[12] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Elsa Orilla, Car ID: 7</li>
            <li>Brand Tempestad, Car ID: 33</li>
            <li>Stenig Fusil, Car ID: 20</li>
            <li>Vira Frente, Car ID: 19</li>
            <li>Bertrand Ovan, Car ID: 29</li>
          </ul>
        </div>
      )}
    </span>
  </div>

  {/* Cluster 13 */}
  <div>
    Cluster ID: 13
    <span
      style={{ marginLeft: '8px', cursor: 'pointer' }}
      onMouseEnter={() => toggleTooltip(13)}
      onMouseLeave={() => hideTooltip(13)}
      onClick={() => toggleTooltip(13)}
    >
      ⓘ
      {tooltipVisible[13] && (
        <div
          style={{
            position: 'absolute',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <ul>
            <li>Isia Vann, Car ID: 16</li>
            <li>Adra Nubarron, Car ID: 22</li>
            <li>Hideki Cocinaro, Car ID: 12</li>
            <li>Ingrid Barranco, Car ID: 4</li>
          </ul>
        </div>
      )}
    </span>
  </div>
</div>
      )}
    </div>
    </div>
  );
};

export default ClusterMapFilter;