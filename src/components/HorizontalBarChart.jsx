import { useEffect, useState, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export default function HorizontalBarChart({data}) {
  const containerRef = useRef();
  const [chart, setChart] = useState(null);
  const regions = ['Sub-Saharan Africa', 'Latin America and Caribbean', 'Middle East and North Africa', 'Europe and Central Asia', 'South Asia', 'East Asia and Pacific', 'High-income countries'];
  const colorScale = d3.scaleOrdinal().domain(regions).range(d3.schemeTableau10);

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (!chart) {
        const plot = Plot.plot({
            marginLeft: 160,
            height: 130,
            x: { label: "World Population (Billions)", axis:"top", domain:[0, 2.5]},
            y: { label: null},
            color: {scheme: "Tableau10", domain: regions},
            marks: [
              Plot.barX(data, {
                x: "value",
                y: "region",
                sort: { y: "x", reverse: true, limit: 10 },
                fill: "region",
                render: (i, s, v, d, c, next) => {
                    const g = next(i, s, v, d, c);
                    c.ownerSVGElement.update = (values) =>
                      d3.select(g)
                        .selectAll("rect")
                        .transition()
                        .duration(750)
                        .attr("width", (i) => s.x(values[i].value) - s.x(0))
                        .attr("x", (i) => s.x(0))
                        .attr("fill", function(i) {
                            return colorScale(values[i].region);
                        });

                    return g;
                  }            
              }),
          
              Plot.text(data, {
                text: d => {
                    const value = d.value;
                    const suffix = Math.floor(value) >= 1 ? 'B' : 'M';
                    if (suffix === "B") {
                        return `${value.toFixed(2)}${suffix}`; 
                    }
                    return `${Math.floor(value * 1000)}${suffix}`;
                },            
                y: "region",
                x: "value",
                textAnchor: "end",
                dx: -3,
                fill: "white",
                render: (i, s, v, d, c, next) => {
                  const g = next(i, s, v, d, c);
                  c.ownerSVGElement.updateText = (values) =>
                    d3.select(g)
                      .selectAll("text")
                      .transition()
                      .duration(750)
                      .text(function(i){
                        const value = values[i].value;
                        const suffix = Math.floor(value) >= 1 ? 'B' : 'M';
                        if (suffix === "B") {
                            return `${value.toFixed(2)}${suffix}`; 
                        }
                        return `${Math.floor(value * 1000)}${suffix}`;
                      })
                      .attr("x", (i) =>  s.x(values[i].value))
                      .attr("transform", (i) => "translate(0," + s.y(values[i].region) + ")")
                      return g;
                }                     
              })
            ]
        });
        
        containerRef.current.append(plot);
        setChart(plot);
    } else {
        chart.update(data).end();
        chart.updateText(data).end();
    }


  }, [data]);
  
  return <div ref={containerRef} />;

}