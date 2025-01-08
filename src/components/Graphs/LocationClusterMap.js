import React from 'react';
import MapChart from '../Charts/MapChart';

// Import JSON data files
import locations from '../../data/location_parking_cluster.json';
import employeeClusters from '../../data/employee_cluster.geojson';
import geojson from '../../data/abila_2.geojson';

const desiredStreetNames = [
  "Rist Way", "Carnero St", "Barwyn St", "Arkadiou St", "Androutsou St",
  "Velestinou Blv", "Ermou St", "Egeou Av", "Ipsilantou Ave", "Pilau St",
  "Parla St", "Spetson St", "Taxiarchon Ave"
];

const LocationClusterMap = () => {
  return (
    <div>
      <h1>GeoJSON and JSON Graph</h1>
      <MapChart
        geojson={geojson}
        locations={locations}
        employeeClusters={employeeClusters}
        desiredStreetNames={desiredStreetNames}
      />
    </div>
  );
};

export default LocationClusterMap;