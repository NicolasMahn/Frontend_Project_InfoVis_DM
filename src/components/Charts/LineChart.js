import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, tooltipData, legend, colors, yAxisLabel, valueType, onLineClick, onLineRightClick, onLineDoubleClick }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 1200;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 70, left: 90 };

    const maxLabelLineLength = 10;
    const maxTicks = 10;

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

    const xAxis = g => {
      const interval = Math.ceil(data.x.length / maxTicks);
      g.attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickValues(data.x.filter((_, i) => i % interval === 0)).tickSizeOuter(0))
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
    }

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

    const handleMouseOver = (event, i) => {
      tooltip.style('opacity', 1);
      tooltip.style('display', 'block')
      .style('opacity', 1)
      .style('left', (event.pageX - 10) + 'px')
      .style('top', (event.pageY - 270) + 'px')
      .html(`<strong>${legend[i]}</strong><br>${tooltipData[i]}`);
    };

    const handleMouseOut = () => {
      tooltip.style('opacity', 0);
    };

    const line = d3.line()
    .x((d, i) => x(data.x[i]) + x.bandwidth() / 2)
    .y(d => y(d));

    if (Array.isArray(data.y[0])) {
      data.y.forEach((yList, i) => {
        svg.append('path')
          .datum(yList)
          .attr('fill', 'none')
          .attr('stroke', colors[i % colors.length])
          .attr('stroke-width', 4)
          .attr('d', line)
          .on('click', function(event, d) {
            event.preventDefault();
            if (onLineClick) onLineClick(d);
          })
          .on('contextmenu', function(event, d) {
            event.preventDefault();
            if (onLineRightClick) onLineRightClick(d);
          })
          .on('dblclick', function(event, d) {
            event.preventDefault();
            if (onLineDoubleClick) onLineDoubleClick(d);
          })
          .on('mouseover', function(event, d) {
            handleMouseOver(event, i);
          })
          .on('mouseout', handleMouseOut)
            .on('mousemove', function(event, d) {
            handleMouseOver(event, i);
          });
      });
    } else {
      svg.append('path')
        .datum(data.y)
        .attr('fill', 'none')
        .attr('stroke', colors[0])
        .attr('stroke-width', 4)
        .attr('d', line)
        .on('click', function(event, d) {
          event.preventDefault();
          if (onLineClick) onLineClick(d);
        })
        .on('contextmenu', function(event, d) {
          event.preventDefault();
          if (onLineRightClick) onLineRightClick(d);
        })
        .on('dblclick', function(event, d) {
          event.preventDefault();
          if (onLineDoubleClick) onLineDoubleClick(d);
        })
        .on('dblclick', function(event, d) {
          event.preventDefault();
          if (onLineDoubleClick) onLineDoubleClick(d);
        })
        .on('mouseover', function(event, d) {
          handleMouseOver(event, 0);
        })
        .on('mouseout', handleMouseOut)
          .on('mousemove', function(event, d) {
          handleMouseOver(event, 0);
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
    }, [data, tooltipData, legend, colors, onLineClick, onLineRightClick, onLineDoubleClick]);
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

export default LineChart;