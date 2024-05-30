import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Swatch({data}) {
  const svgRef = useRef(null);

  const width = 1200;
  const height = 100;

  useEffect(() =>{
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const regions = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Middle East'];
    const colorScale = d3.scaleOrdinal().domain(regions).range([d3.schemeObservable10[0], d3.schemeObservable10[1], d3.schemeObservable10[2], 
                                                                d3.schemeObservable10[3],d3.schemeObservable10[4], d3.schemeObservable10[5]])
    const xCircleScale = d3.scaleOrdinal().domain(regions).range([0, 175, 300, 450, 650, 830])
    const xTextScale = d3.scaleOrdinal().domain(regions).range([50, 225, 350, 500, 700, 880])

   const legend = svg.append("g")
        .selectAll("rect")
        .data(regions)
        .join("rect")
        .attr("x", (d) => xCircleScale(d))
        .attr("y", 50)
        .attr("height", 40)
        .attr("width", 40)
        .attr("fill", (d) => colorScale(d));

   const text = svg.append("g")
   .selectAll("text")
   .data(regions)
   .join("text")
   .attr("font-size", "32px")
   .attr("fill", "white")
   .attr("x", (d,i) => xTextScale(d))
   .attr("y", 80)
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
