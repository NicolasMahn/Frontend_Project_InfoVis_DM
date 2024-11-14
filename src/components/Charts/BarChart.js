import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();
  

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 1200;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr('width', width).attr('height', height);

    const x = d3.scaleBand()
      .domain(data.x)
      .range([margin.left, width - margin.right])
      .padding(0.1);

      const yMax = d3.max(data.y.flat());
      const y = d3.scaleLinear()
        .domain([0, yMax]).nice()
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // Access CSS variables
    const colors = [
      getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--tertiary-color').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--quaternary-color').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--quinary-color').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--senary-color').trim()
    ];

    if (Array.isArray(data.y[0])) {
        // Multiple lists for y-axis (grouped bar chart)
        const subgroups = d3.range(data.y.length);
        const xSubgroup = d3.scaleBand()
          .domain(subgroups)
          .range([0, x.bandwidth()])
          .padding(0.05);
  
        svg.append('g')
          .selectAll('g')
          .data(data.x)
          .join('g')
          .attr('transform', d => `translate(${x(d)},0)`)
          .selectAll('rect')
          .data((d, i) => data.y.map(yList => yList[i]))
          .join('rect')
          .attr('x', (d, i) => xSubgroup(i))
          .attr('y', d => y(d))
          .attr('height', d => y(0) - y(d))
          .attr('width', xSubgroup.bandwidth())
          .attr('fill', (d, i) => colors[i % colors.length]);
      } else {
        // Single list for y-axis (simple bar chart)
        svg.append('g')
          .selectAll('rect')
          .data(data.y)
          .join('rect')
          .attr('x', (d, i) => x(data.x[i]))
          .attr('y', d => y(d))
          .attr('height', d => y(0) - y(d))
          .attr('width', x.bandwidth())
          .attr('fill', colors[0]);
      }
    }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;