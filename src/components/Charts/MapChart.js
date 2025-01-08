import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MapChart = ({ geojson, locations, employeeClusters, desiredStreetNames }) => {
  const graphRef = useRef();

  useEffect(() => {
    if (geojson && locations && employeeClusters) {
      createGraph();
    }
  }, [geojson, locations, employeeClusters]);

  const createGraph = () => {
    const svg = d3.select(graphRef.current).attr('width', 800).attr('height', 600);

    const projection = d3.geoMercator().fitSize([800, 600], geojson);
    const path = d3.geoPath().projection(projection);

    // Clear previous graph
    svg.selectAll('*').remove();

    const features = geojson?.features || [];
    if (!Array.isArray(features)) {
      console.error('Invalid GeoJSON structure:', geojson);
      return;
    }

    // Step 1: Render the Abila map as background
    svg.append('g')
      .selectAll('path')
      .data(features)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eaeaea')
      .attr('stroke', '#cccccc')
      .attr('stroke-width', 0.5);

    // Step 2: Highlight desired streets
    svg.append('g')
      .selectAll('path')
      .data(features.filter((d) => desiredStreetNames.includes(d.properties?.name)))
      .join('path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#888888')
      .attr('stroke-width', 2);

    // Step 3: Render location clusters
    svg.append('g')
      .selectAll('path')
      .data(locations || [])
      .join('path')
      .attr('d', (d) => {
        if (!d.geometry || !Array.isArray(d.geometry.coordinates)) {
          console.error('Invalid location coordinates:', d);
          return null;
        }
        try {
          return path({ type: d.geometry.type, coordinates: d.geometry.coordinates });
        } catch (error) {
          console.error('Error generating path:', error, d);
          return null;
        }
      })
      .attr('fill', 'blue')
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Step 4: Render employee clusters
    svg.append('g')
      .selectAll('circle')
      .data(employeeClusters.features || [])
      .join('circle')
      .attr('cx', (d) => {
        if (!d.geometry || !Array.isArray(d.geometry.coordinates)) {
          console.error('Invalid employee cluster geometry:', d);
          return null;
        }
        return projection(d.geometry.coordinates)[0];
      })
      .attr('cy', (d) => {
        if (!d.geometry || !Array.isArray(d.geometry.coordinates)) {
          return null;
        }
        return projection(d.geometry.coordinates)[1];
      })
      .attr('r', 5)
      .attr('fill', 'red')
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Step 5: Render employee cluster labels
    svg.append('g')
      .selectAll('text')
      .data(employeeClusters.features || [])
      .join('text')
      .attr('transform', (d) => {
        const coordinates = d.geometry.coordinates;
        const [x, y] = projection(coordinates);
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text((d) => d.properties?.cluster_id || '')
      .attr('fill', 'white')
      .attr('font-size', 12)
      .attr('font-weight', 'bold');
  };

  return <svg ref={graphRef}></svg>;
};

export default MapChart;
