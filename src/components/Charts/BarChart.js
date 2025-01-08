import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, legend, colors, yAxisLabel, valueType, onBarClick, onBarRightClick, onBarDoubleClick }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 1200;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 70, left: 60 };

    const maxLabelLineLength = 10;

    svg.attr('width', width).attr('height', height);

    svg.selectAll('*').remove();

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
      .style("text-anchor", "end")
      .style("font-size", "12px")
      .each(function(d) {
        const text = d3.select(this);
        const words = d.split(' ');
        text.text('');
        let charCount = 0;
        let linebroken = false;
        for (let i = 0; i < words.length; i++) {
          charCount += words[i].length;
          if (charCount > maxLabelLineLength && (linebroken || words.length === 1)) {
            let final_line = ' ' + words[i].substring(0, words[i].length-((charCount-maxLabelLineLength)+3)) + '...';
            if (final_line.length < 5) {
              final_line = '...';
            }
            text.append('tspan')
              .text(final_line);
            break;
          } else if (charCount > maxLabelLineLength && words.length > 1) {
            text.style('font-size', '12px');
            text.append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? 0 : '0.8em')
              .text(' ' + words[i]);
              charCount = words[i].length;
            linebroken = true;
          } else {
            text.append('tspan')
              .text(' ' + words[i]);
          }
        }
      });

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d => `${d}${valueType}`))
      .selectAll("text")
      .style("font-size", "14px"); 

      svg.append('text')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2 - 20)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(yAxisLabel);

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const handleMouseOver = (event, d) => {
      tooltip.style('opacity', 1);
      let i = d.index;
      tooltip.html(`
        <b>${data.x[i]}</b><br>
        ${Array.isArray(data.y[0]) ? data.y.map((yList, j) => `${legend[j]}: ${parseFloat(yList[i].toFixed(2))}${valueType}`).join('<br>') : `${legend[0]}: ${parseFloat(data.y[i].toFixed(2))}${valueType}`}`)
        .style('left', `${event.pageX - 10}px`)
        .style('top', `${event.pageY - 270}px`);
    };

    const handleMouseOut = () => {
      tooltip.style('opacity', 0);
    };

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
          .data((_, i) => data.y.map((yList) => ({
            value: yList[i], 
            index: i,
            category: data.x[i]
          })))
          .join('rect')
          .attr('x', (d, i) => xSubgroup(i))
          .attr('y', d => y(d.value))
          .attr('height', d => y(0) - y(d.value))
          .attr('width', xSubgroup.bandwidth())
          .attr('fill', (d, i) => colors[i % colors.length])
          .on('mouseover', handleMouseOver)
          .on('mouseout', handleMouseOut)
          .on('mousemove', handleMouseOver)
          .on('click', function(event, d) {
            event.preventDefault();
            if (onBarClick) onBarClick(d);
          })
          .on('contextmenu', function(event, d) {
            event.preventDefault();
            if (onBarRightClick) onBarRightClick(d);
          })
          .on('dblclick', function(event, d) {
            event.preventDefault();
            if (onBarDoubleClick) onBarDoubleClick(d);
          });
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
          .attr('fill', colors[0])
          .data((_, i) => data.x.map((x) => ({
            value: x, 
            index: i,
            category: data.x[i]
          })))
          .on('mouseover', handleMouseOver)
          .on('mouseout', handleMouseOut)
          .on('mousemove', handleMouseOver)
          .on('click', function(event, d) {
            event.preventDefault();
            if (onBarClick) onBarClick(d);
          })
          .on('contextmenu', function(event, d) {
            event.preventDefault();
            if (onBarRightClick) onBarRightClick(d);
          })
          .on('dblclick', function(event, d) {
            event.preventDefault();
            if (onBarDoubleClick) onBarDoubleClick(d);
          });
      }
          // Add legend
      if (legend && legend.length) {
        const legendGroup = svg.append('g')
        .attr('transform', `translate(${width - margin.right -200}, ${margin.top})`);

        legend.forEach((legendItem, index) => {
          const legendRow = legendGroup.append('g')
            .attr('transform', `translate(0, ${index * 20})`);

          legendRow.append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', colors[index % colors.length]);

          legendRow.append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '0.35em')
            .text(legendItem);
        });
      }
    }, [data, legend, colors, onBarClick, onBarRightClick, onBarDoubleClick]);
    return (
      <div style={{ position: 'relative' }}>
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} style={{
          position: 'absolute',
          textAlign: 'center',
          width: 'auto',
          height: 'auto',
          padding: '5px',
          font: '14px sans-serif',
          background: getComputedStyle(document.documentElement).getPropertyValue('--tooltip-background-color').trim(),
          border: '1px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--tooltip-border-color').trim(),
          color: getComputedStyle(document.documentElement).getPropertyValue('--tooltip-text-color').trim(),
          //borderRadius: '8px',
          pointerEvents: 'none',
          opacity: 0
        }}></div>
      </div>
    );
};

export default BarChart;