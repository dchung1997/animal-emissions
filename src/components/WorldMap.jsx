import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

import countries110m from "../assets/countries110m.json";

export default function WorldMap({ data, width, height }) {
  const canvasRef = useRef(null);
  const startTime = useRef(performance.now()); // Store the animation start time

  function lerp(start, end, amt) {
    function interpolate(start, end, amt) {
      return start + (end - start) * amt;
    }
    const progress = interpolate(-Math.PI / 2, Math.PI / 2, amt);
    const wave = Math.sin(progress);
    return [
      start[0] + (end[0] - start[0]) * wave,
      start[1] + (end[1] - start[1]) * wave,
      start[2] + (end[2] - start[2]) * wave,
    ];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const sphere = { type: "Sphere" };
    const graticule = d3.geoGraticule10();

    if (data && data !== null) {
      if (canvas) {
        const context = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const countryData = data.filter(function (d) {
          if (d.Numeric !== null) {
            return d;
          }
        });

        const countryMap = new Map(
          countryData.map((d) => [d["Numeric"], d[2018]])
        );
        const colorScale = d3.scaleSequentialSqrt(
          d3.extent(countryData, (d) => d["2018"]),
          d3.interpolateYlOrRd
        );

        const projection = d3
          .geoOrthographic()
          .fitExtent(
            [
              [-1, -1],
              [width + 1, height + 1],
            ],
            sphere
          )
          .clipExtent([
            [-1, -1],
            [width + 1, height + 1],
          ])
          .rotate([
            -19.917171915019626, -15.517172785271619, 2.157530093709392,
          ]);

        const path = d3.geoPath(projection, context).pointRadius(1.5);

        function render(e, progress) {
          if (progress) {
            const arr = lerp(
              [-19.917171915019626, -15.517172785271619, 2.157530093709392],
              [-80.74239372364408, -20.63645715631896, -7.392779204463817],
              progress
            );

            projection.rotate(arr);
            path.projection(projection);
          }

          context.clearRect(0, 0, width, height);

          context.beginPath();
          path(sphere);
          context.lineWidth = 1.5;
          context.strokeStyle = "grey";
          context.fillStyle = "rgba(163, 179, 201, 1)";
          context.stroke();
          context.fill();

          context.beginPath();
          path(graticule);
          context.lineWidth = 0.5;
          context.strokeStyle = "rgb(30,30,30, 0.75)";
          context.stroke();

          for (const country of countries110m.features) {
            const element = countryMap.get(parseInt(country.id));

            context.beginPath();
            path(country);
            context.lineWidth = 1.0;

            if (element) {
              context.fillStyle = colorScale(element);
            } else {
              context.fillStyle = "rgba(0,0,0, 0.5)";
            }

            context.strokeStyle = "black";
            context.stroke();
            context.fill();
          }
        }

        const updateAnimation = () => {
          // Update rendering based on animationProgress (calculated from time)
          // Use inView from useInView hook

          const elapsedTime = performance.now() - startTime.current;
          const animationProgress = elapsedTime / 3000; // Calculate progress (0 to 1)
          d3.select(context.canvas).call(render, animationProgress);

          // Reset if animation is complete
          if (animationProgress >= 2) {
            startTime.current = performance.now(); // Reset start time for next loop
          }

          requestAnimationFrame(updateAnimation);
        };

        updateAnimation(startTime);
      }
    }
  }, [data]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
