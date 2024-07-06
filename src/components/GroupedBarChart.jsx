import { useEffect, useState, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export default function GroupedBarChart({data, name, domain}) {
  const containerRef = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
    if (!chart) {
        const max2012 = d3.max(data.filter((d) => d.Year === 2012), (d) => d.Value);

        const plot = Plot.plot({
          marginLeft: 10,
          x: {axis: null, domain: ['Stratified Societies', 'Business As Usual', 'Toward Sustainability']},
          y: {tickFormat: "s", grid: true, label:name + " Meat Yield (kg)", domain: domain},
          fx: {padding: 0, label: null, tickSize: 6},
          width: 1000,
          height: 400,
          color: {scheme: "YlGnBu"},
          className: "grouped-bar-" + name, 
          marks: [
            Plot.ruleY([max2012], {
              stroke: "grey",
              strokeDasharray: [5, 5], 
              strokeWidth: 2.5
            }),
            Plot.barY(data, {
              x: "Scenario",
              y: "Value",
              fill: "Scenario",
              fx: "Region",
              render: (i, s, v, d, c, next) => {
                const g = next(i, s, v, d, c);
                c.ownerSVGElement.update = (values) =>
                  d3.select(".grouped-bar-" + name)
                    .selectAll("g")
                    .selectAll("rect")
                    .transition()
                    .duration(750)
                    .attr("height", function(i) {
                      if (!values[i]) { return; }
                      return s.y(0) - s.y(values[i].Value);
                    })
                    .attr("y", function(i) {
                      if (!values[i]) { return; }
                      return s.y(values[i].Value);
                    })
                    .attr("fill", function(i) {
                      if (!values[i]) { return; }
                      return s.color(values[i].Scenario);
                    });
                return g;
              }              
            }),
            Plot.ruleY([0])
          ]
        });
        
        containerRef.current.append(plot);
        setChart(plot);
    } else {
      chart.update(data).end();
  }

  }, [data]);

  return <div ref={containerRef} />;
}