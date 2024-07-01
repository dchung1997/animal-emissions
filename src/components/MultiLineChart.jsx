import { useEffect, useState, useRef } from "react";
import * as Plot from "@observablehq/plot";

export default function MultiLineChart({ data, name, title }) {
  const containerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;
    const regions = [
      "Sub-Saharan Africa",
      "Latin America & Caribbean",
      "Middle East & North Africa",
      "Europe & Central Asia",
      "South Asia",
      "East Asia & Pacific",
      "World",
    ];

    Object.keys(data).forEach(function (d) {
      data[d].forEach((element) => {
        element.region = d;
      });
    });

    const marks = Object.keys(data).map(function (d) {
      if (
        d !== "High income" &&
        d !== "Low income" &&
        d !== "Lower middle income" &&
        d !== "Upper middle income"
      ) {
        return Plot.lineY(data[d], {
          x: "date",
          y: "value",
          stroke: "region",
          strokeWidth: 5,
        });
      }
    });

    const plot = Plot.plot({
      title: title,
      color: {
        type: "categorical",
        scheme: "Tableau10",
        domain: regions,
        legend: true,
      },
      y: {
        grid: true,
        label: name,
      },
      marks: marks,
    });

    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} />;
}
