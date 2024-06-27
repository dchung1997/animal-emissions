import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Swatch({data}) {
  const svgRef = useRef(null);

  const width = 1200;
  const height = 60;

  useEffect(() =>{
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const regions = ['Stratisfied Societies', 'Business as Usual', 'Towards Sustainability'];
    const colorScale = d3.scaleOrdinal().domain(regions).range([d3.schemeYlGnBu[3][1], d3.schemeYlGnBu[3][0] , d3.schemeYlGnBu[3][2]])
    const xCircleScale = d3.scaleOrdinal().domain(regions).range([0, 350, 700])
    const xTextScale = d3.scaleOrdinal().domain(regions).range([50, 400, 750])

   const legend = svg.append("g")
        .selectAll("rect")
        .data(regions)
        .join("rect")
        .attr("x", (d) => xCircleScale(d))
        .attr("y", 0)
        .attr("height", "2.5em")
        .attr("width", "2.5em")
        .attr("fill", (d) => colorScale(d));

   const text = svg.append("g")
   .selectAll("text")
   .data(regions)
   .join("text")
   .attr("font-size", "1.5em")
   .attr("fill", "white")
   .attr("x", (d,i) => xTextScale(d))
   .attr("y", 30)
   .text((d) => d)

  }, [])

  return (
    <div className="swatchContainer">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={svgRef}
      >
      </svg>
    </div>
  );
}

export default Swatch;
