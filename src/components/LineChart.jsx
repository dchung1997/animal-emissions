import { useEffect, useState, useRef } from "react";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

export default function LineChart({ data, column, color }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;
    const selectedData = data[column];
    const extent = d3.extent(selectedData, (d) => d.value);
    const regions = [
      "Sub-Saharan Africa",
      "Latin America & Caribbean",
      "Middle East & North Africa",
      "Europe & Central Asia",
      "South Asia",
      "East Asia & Pacific",
      "World",
    ];
    const colorScale = d3
      .scaleOrdinal()
      .domain(regions)
      .range(d3.schemeTableau10);

    const plot = Plot.plot({
      marginTop: 35,
      marginLeft: 60,
      marginRight: 40,
      y: {
        grid: true,
        label: column + " (Population %)",
        domain: extent,
        ticks: 5
      },
      x: {
        ticks: 5,
      },
      marks: [
        Plot.areaY(selectedData, {
          x: "date",
          y1: extent[0],
          y2: "value",
          fill: (d) => colorScale(d.region),
          fillOpacity: 0.5,
        }),
        Plot.lineY(selectedData, {
          x: "date",
          y: "value",
          stroke: (d) => colorScale(d.region),
          strokeWidth: 5,
        }),
      ],
    });

    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} />;
}
