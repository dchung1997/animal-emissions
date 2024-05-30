import { useEffect, useRef } from "react";
import * as d3 from "d3";

import "./ForceLayout.css";

function ForceLayout({data}) {
  const svgRef = useRef(null);

  const width = 1200;
  const height = 700;

  useEffect(() =>{
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const regions = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Middle East'];
    const colorScale = d3.scaleOrdinal().domain(regions).range([d3.schemeObservable10[0], d3.schemeObservable10[1], d3.schemeObservable10[2], 
                                                                d3.schemeObservable10[3],d3.schemeObservable10[4], d3.schemeObservable10[5]])

    const xCenter = [100, 400, 700, 1000];
    const categoryScale = d3.scaleOrdinal().domain(['low', 'lower-middle', 'upper-middle', 'high']).range([0,1,2,3])
    const categoryScaleCenter = d3.scaleOrdinal().domain(['low', 'lower-middle', 'upper-middle', 'high']).range(xCenter)

    function categorizeRegion(region) {
        switch (region) {
          case "East Asia/Southeast Asia":
            return "Asia";
          case "South Asia":
            return "Asia";
          case "Central Asia":            
            return "Asia";
          case "Middle East":
            return "Middle East";
          case "Africa":
            return "Africa";
          case "Central America":
            return "Americas";  // Combine North, Central, and South America
          case "North America":
            return "Americas";  // Combine North, Central, and South America            
          case "South America":
            return "Americas";  // Combine North, Central, and South America
          case "Europe":
            return "Europe";
          default:
            return "Oceania";  // Unclassified regions go to Oceania
        }
      }

    if (data) {
        const filteredData = data.children.filter(function(d) {
            return d.category !== "none";
        });

        const extent = d3.extent(filteredData, function(d) {
            return d.value;
        });
        const scaleRadius = d3.scaleSqrt().domain(extent).range([5, 100]);
        const nodes = filteredData.map(function(d, i) {
            const newRegion = categorizeRegion(d.region);
            return {
                radius: scaleRadius(d.value),
                category: categoryScale(d.category),
                region: newRegion, // Add the newly categorized region
                country: d.name,
                value: d.value
            }
        });
        
        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(5))
            .force('x', d3.forceX().x(function(d) {
                return xCenter[d.category];
            }))
            .force('collision', d3.forceCollide().radius(function(d) {
                return d.radius;
            }))
            .on('tick', ticked);
        
        svg.append("g")  
            .call(d3.axisBottom(categoryScaleCenter).tickSize(0))
            .attr("transform", `translate(0,${height-50})`)
            .attr("stroke", "none")
            .attr("fill", "white")               
            .attr("font-size", "32px");       

        function ticked() {
            var u = svg.selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', function(d) {
                    return d.radius;
                })
                .style('fill', function(d) {
                    return colorScale(d.region);
                })
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y + 330;
                })
                .append("title")
                .text(function(d) { return d.region + ", " + d.country + " " + d.value + " kg."; });                

        }
    }
  }, [data])

  return (
    <div className="forceLayoutContainer">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={svgRef}
      >
      </svg>
    </div>
  );
}

export default ForceLayout;
