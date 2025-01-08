import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Import JSON data files
import locations from '../../data/location_parking_cluster.json';
import employeeClusters from '../../data/employee_cluster.geojson';
import geojson from '../../data/abila_2.geojson';

const desired_street_names = [
  "Rist Way", "Carnero St", "Barwyn St", "Arkadiou St", "Androutsou St",
  "Velestinou Blv", "Ermou St", "Egeou Av", "Ipsilantou Ave", "Pilau St",
  "Parla St", "Spetson St", "Taxiarchon Ave"
];

const LocationClusterMap = () => {
  const graphRef = useRef();

  useEffect(() => {
    createGraph();
  }, []);

  const createGraph = () => {
    const svg = d3.select(graphRef.current).attr('width', 800).attr('height', 600);

    const projection = d3.geoMercator().fitSize([800, 600], geojson);
    const path = d3.geoPath().projection(projection);

    console.log('GeoJSON:', geojson);
    console.log('Locations:', locations);
    console.log('Employee Clusters:', employeeClusters);

    // Step 1: Render the Abila map
    svg.append('g')
      .selectAll('path')
      .data(geojson.features || [])
      .join('path')
      .attr('d', (d) => {
        if (!d.geometry || !d.geometry.coordinates) {
          console.error('Invalid GeoJSON feature:', d);
          return null;
        }
        try {
          return path(d);
        } catch (error) {
          console.error('Error generating path:', error, d);
          return null;
        }
      })
      .attr('fill', '#eaeaea')
      .attr('stroke', (d) => (desired_street_names.includes(d.properties?.Name) ? '#888888' : '#cccccc'))
      .attr('stroke-width', (d) => (desired_street_names.includes(d.properties?.Name) ? 2 : 0.5));

    // Step 2: Render location clusters
    svg.append('g')
      .selectAll('circle')
      .data(locations || [])
      .join('circle')
      .attr('cx', (d) => {
        const coordinates = d.geometry.coordinates;
        if (!Array.isArray(coordinates)) {
          console.error('Invalid location coordinates:', d);
          return null;
        }
        return projection(coordinates)[0];
      })
      .attr('cy', (d) => {
        const coordinates = d.geometry.coordinates;
        if (!Array.isArray(coordinates)) {
          console.error('Invalid location coordinates:', d);
          return null;
        }
        return projection(coordinates)[1];
      })
      .attr('r', 5)
      .attr('fill', 'blue');

    // Step 3: Render employee clusters
    svg.append('g')
      .selectAll('circle')
      .data(employeeClusters.features || [])
      .join('circle')
      .attr('cx', (d) => {
        const coordinates = d.geometry.coordinates;
        if (!Array.isArray(coordinates)) {
          console.error('Invalid employee cluster coordinates:', d);
          return null;
        }
        return projection(coordinates)[0];
      })
      .attr('cy', (d) => {
        const coordinates = d.geometry.coordinates;
        if (!Array.isArray(coordinates)) {
          console.error('Invalid employee cluster coordinates:', d);
          return null;
        }
        return projection(coordinates)[1];
      })
      .attr('r', 10)
      .attr('fill', 'red');

    // Step 4: Render employee cluster labels
    svg.append('g')
      .selectAll('text')
      .data(employeeClusters.features || [])
      .join('text')
      .attr('x', (d) => {
        const coordinates = d.geometry.coordinates;
        if (!Array.isArray(coordinates)) {
          console.error('Invalid employee cluster coordinates:', d);
          return null;
        }
        return projection(coordinates)[0];
      })
      .attr('y', (d) => {
        const coordinates = d.geometry.coordinates;
        if (!Array.isArray(coordinates)) {
          console.error('Invalid employee cluster coordinates:', d);
          return null;
        }
        return projection(coordinates)[1];
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text((d) => d.properties?.cluster_id || '')
      .attr('fill', 'white')
      .attr('font-size', 12)
      .attr('font-weight', 'bold');
  };

  return (
    <div>
      <h1>Abila Map with Clusters</h1>
      <svg ref={graphRef}></svg>
    </div>
  );
};

export default LocationClusterMap;