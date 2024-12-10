import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const MatrixChart = ({ matrix, xAxis, yAxis, xAxisName, yAxisName, unit, onCellClick, onCellRightClick, onCellDoubleClick }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 1200;
    const height = 600;
    const margin = { top: 20, right: 100, bottom: 70, left: 60 };

    const zeroWhite = '#f6f6f6';

    svg.attr('width', width).attr('height', height);
    svg.selectAll('*').remove();

    const x = d3.scaleBand()
      .domain(xAxis)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleBand()
      .domain(yAxis)
      .range([margin.top, height - margin.bottom])
      .padding(0.1);
  
    const customInterpolator = t => t === 1 ? zeroWhite : d3.interpolateSpectral(t);

    const colorScale = d3.scaleSequential(customInterpolator)
      .domain([d3.max(matrix.flat()), 0]);

    const cells = svg.selectAll('rect')
      .data(matrix.flatMap((row, i) => row.map((value, j) => ({ value, x: j, y: i }))))
      .enter().append('rect')
      .attr('x', d => x(xAxis[d.x]))
      .attr('y', d => y(yAxis[d.y]))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => d.value === 0 ? zeroWhite : colorScale(d.value))
      .on('mouseover', (event, d) => {
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`<b>${xAxisName.slice(0, -1)}: ${xAxis[d.x]}<br>${yAxisName.slice(0, -1)}: ${yAxis[d.y]}</b><br>${parseFloat(d.value.toFixed(2))}${unit}`)
        .style('left', (event.pageX + 20) + 'px')
        .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
      tooltip.transition().duration(500).style('opacity', 0);
      })          
      .on('click', function(event, d) {
        event.preventDefault();
        if (onCellClick) onCellClick(d);
      })
      .on('contextmenu', function(event, d) {
        event.preventDefault();
        if (onCellRightClick) onCellRightClick(d);
      })
      .on('dblclick', function(event, d) {
        event.preventDefault();
        if (onCellDoubleClick) onCellDoubleClick(d);
      });
    
    // Add tooltip styling
    tooltip.style('position', 'absolute')
      .style('text-align', 'center')
      .style('width', 'auto')
      .style('height', 'auto')
      .style('padding', '5px')
      .style('font', '14px sans-serif')
      .style('background', getComputedStyle(document.documentElement).getPropertyValue('--tooltip-background-color').trim())
      .style('border', '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--tooltip-border-color').trim())
      .style('color', getComputedStyle(document.documentElement).getPropertyValue('--tooltip-text-color').trim())
      .style('border-radius', '0px')
      .style('pointer-events', 'none')
      .style('opacity', 0);


    const xAxisG = svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    const yAxisG = svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 2 + 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(xAxisName);

    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2 - 10)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(yAxisName);

    const colorBar = svg.append('g')
      .attr('transform', `translate(${width - margin.right / 2}, ${margin.top})`);


    const colorBarScale = d3.scaleLinear()
      .domain(colorScale.domain().reverse())
      .range([height - margin.top - margin.bottom, 0]);

    const colorBarAxis = d3.axisRight(colorBarScale)
      .ticks(6)
      .tickFormat(d => unit === '%' ? `${d}%` : d);

    colorBar.selectAll('rect')
      .data(d3.range(0, 1, 0.01))
      .enter().append('rect')
      .attr('x', -20)
      .attr('y', (d, i) => i * ((height - margin.top - margin.bottom) / 100)) // Adjust y attribute
      .attr('width', 20)
      .attr('height', (height - margin.top - margin.bottom) / 100)
      .attr('fill', d => d === 0.99 ? zeroWhite : customInterpolator(d));

    colorBar.call(colorBarAxis)
      .selectAll('text')
      .style('font-size', '14px') // Increase font size

  }, [matrix, xAxis, yAxis]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', opacity: 0, backgroundColor: 'white', padding: '5px', borderRadius: '5px', pointerEvents: 'none' }}></div>
    </div>
  );
};

export default MatrixChart;