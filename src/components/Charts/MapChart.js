import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import GeoJSON files
import abilaGeojson from '../../data/abila_2.geojson';
import locations from '../../data/location_parking_cluster.json';
import employeeClusters from '../../data/employee_cluster.geojson';

const MapChart = () => {
  const styleStreet = { color: '#888', weight: 1 };
  const styleLocation = { color: 'green', weight: 2, fillOpacity: 0.5 };
  const styleEmployee = { color: 'red', weight: 2 };

  return (
    <MapContainer
      center={[36.07, 24.85]}
      zoom={13}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={abilaGeojson} style={styleStreet} />
      <GeoJSON data={locations} style={styleLocation} />
      <GeoJSON
        data={employeeClusters}
        style={styleEmployee}
        pointToLayer={(feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: 'red',
            color: 'black',
            weight: 1,
          });
        }}
      />
    </MapContainer>
  );
};

export default MapChart;
