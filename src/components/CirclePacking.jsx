import { useEffect, useRef } from "react";
import * as d3 from "d3";

import * as data from "../assets/data.json";

import "./CirclePacking.css";

function CirclePacking() {
  const svgRef = useRef(null);

  const width = 928;
  const height = width;

  function findParentName(element, targetNames) {
    while (element && element.parent) {
      if (targetNames.includes(element.parent.data.name)) {
        return element.parent.data.name;
      }
      element = element.parent;
    }
    return null; // Not found
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const categories = [
      "Poultry",
      "Beef",
      "Pig",
      "Fish and Seafood",
      "Other Meat",
      "Sheep & Goat",
    ];

    const colors = [
      d3.schemeObservable10[0],
      d3.schemeObservable10[1],
      d3.schemeObservable10[2],
      d3.schemeObservable10[3],
      d3.schemeObservable10[4],
      d3.schemeObservable10[5],
    ];

    const color = d3.scaleOrdinal().domain(categories).range(colors);
    // Compute the hierarchy from the JSON data; recursively sum the
    // values for each node; sort the tree by descending value; lastly
    // apply the pack layout.
    const pack = (data) =>
      d3.pack().size([width, height]).padding(5)(
        d3
          .hierarchy(data)
          .sum((d) => d.value)
          .sort((a, b) => b.value - a.value)
      );
    const root = pack(data);

    // Append the nodes.
    const node = svg
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", (d, i) =>
        d.children ? "#fff" : color(findParentName(d, categories))
      )
      .attr("fill-opacity", (d, i) => (d.children ? 0 : 1))
      .attr("pointer-events", (d) => (!d.children ? "none" : null))
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "grey");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
      })
      .on(
        "click",
        (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
      );

    // Append the text labels.
    const label = svg
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("fill", "white")      
      .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
      .style("display", (d) => (d.parent === root ? "inline" : "none"))
      .text((d) => d.data.name);

    // Create the zoom behavior and zoom immediately in to the initial focus node.
    svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view;
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];

      view = v;

      label.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k}) rotate(270)`
      );
      node.attr(
        "transform",
        (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      );
      node.attr("r", (d) => d.r * k);
    }

    function zoom(event, d) {
      const focus0 = focus;

      focus = d;

      const transition = svg
        .transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", (d) => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t) => zoomTo(i(t));
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transition)
        .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    }
  }, []);

  return (
    <div className="circlePackingContainer">
      <svg
        viewBox={`${-width / 2}, ${-height / 2}, ${width} ${height}`}
        ref={svgRef}
      ></svg>
    </div>
  );
}

export default CirclePacking;
