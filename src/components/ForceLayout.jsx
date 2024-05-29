import { useEffect, useRef } from "react";
import * as d3 from "d3";

import "./ForceLayout.css";

function ForceLayout({data}) {
  const svgRef = useRef(null);

  const width = 1200;
  const height = 700;

  useEffect(() =>{
    const svg = d3.select(svgRef.current);
    const colorScale = [d3.schemeObservable10[0], d3.schemeObservable10[1], d3.schemeObservable10[2], d3.schemeObservable10[3]];
    const xCenter = [100, 400, 700, 1000];
    const categoryScale = d3.scaleOrdinal().domain(['low', 'lower-middle', 'upper-middle', 'high']).range([0,1,2,3])
    const categoryScaleCenter = d3.scaleOrdinal().domain(['low', 'lower-middle', 'upper-middle', 'high']).range(xCenter)

    if (data) {
        const filteredData = data.children.filter(function(d) {
            return d.category !== "none";
        });

        const extent = d3.extent(filteredData, function(d) {
            return d.value;
        });
        const scaleRadius = d3.scaleSqrt().domain(extent).range([5, 100]);
        const nodes = filteredData.map(function(d, i) {
            return {
                radius: scaleRadius(d.value),
                category: categoryScale(d.category)
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
        
        function ticked() {
            var u = svg.selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', function(d) {
                    return d.radius;
                })
                .style('fill', function(d) {
                    return colorScale[d.category];
                })
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y + 330;
                });

            svg.append("g")
            .attr("transform", `translate(0,${height-50})`)
            .attr("stroke", "none")
            .attr("fill", "white")     
            .call(d3.axisBottom(categoryScaleCenter).tickSize(0))
            .attr("font-size", "32px");                
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
