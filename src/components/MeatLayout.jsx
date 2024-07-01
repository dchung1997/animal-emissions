import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function MeatLayout({data, yearData, extents}) {
  const svgRef = useRef(null);
  const svg = d3.select(svgRef.current);

  const [initialized, setInitialized] = useState(false);
  
  const width = 1900;
  const height = 1200;

  const regions = ['Sub-Saharan Africa', 'Latin America/Caribbean', 'Middle East/North Africa', 'Europe/Central Asia', 'South Asia', 'East Asia and Pacific', 'High-income'];
  const animals = ["Total Number of Cattle", "Total Number of Poultry", "Total Number of Pigs", "Total Number of Goats and Sheep"];
  const scenarios = ["Stratified Societies", "Business As Usual", "Toward Sustainability"];
  const abrevations = ["Stratisfied", "Current", "Sustainability"];

  const subScale = d3.scaleOrdinal().domain(scenarios).range([0, 125, 250]);
  const xScale = d3.scaleBand().domain(animals).range([100, 2000]);
  const abrevScale = d3.scaleOrdinal().domain(abrevations).range([0, 125, 250]);
  
  const indexScale = d3.scaleOrdinal().domain(animals).range([0, 1, 2, 3]);
  const colorScale = d3.scaleOrdinal().domain(regions).range(d3.schemeTableau10)

  const [sim, setSim] = useState(null);
  const [yScales, setYScales] = useState(null);

  useEffect(() => {
    if (!yearData){ return; }
    const scaleMap = new Map();
    animals.map(function(animal) {
        scenarios.map(function(scenario) {
            const currentCategory = yearData.get(animal).filter((entry) => entry.Scenario === scenario);
            const currentRegions = currentCategory.map((d) => d.Region);   
            const yScale = d3.scaleBand(currentRegions, [100, 2100]);
            scaleMap.set(`${animal}-${scenario}`, yScale);
        });
    });

    setYScales(scaleMap)
  }, [yearData])

  useEffect(() =>{
    if (!data || data.length === 0 || !extents || extents.length === 0 || !yScales) { return; }
    const circleRadius = [d3.scaleSqrt().domain([0, extents[0][1]]).range([1,30]), d3.scaleSqrt().domain([0, extents[1][1]]).range([1,30]), d3.scaleSqrt().domain([0, extents[2][1]]).range([1,30]), d3.scaleSqrt().domain([0, extents[3][1]]).range([1,30])]
    
    const nodes = data.map(function(d) {
        return {
            id: d.CountryCode,
            color: colorScale(d.Region),
            radius: circleRadius[indexScale(d.Item)](d.Value),
            scenario: d.Scenario,
            region: d.Region,
            item: d.Item
        }
    });

    
    if (!initialized) {
        const g = svg.append("g");
        const gAxis = svg.append("g");
        const gSubCowAxis = svg.append("g");
        const gSubChickenAxis = svg.append("g");
        const gSubPigAxis = svg.append("g");
        const gSubGoatAxis = svg.append("g");
        
        const axisTop = g => g
          .call(d3.axisTop(xScale))
          .attr('transform', "translate(-110, 50)")
          .attr('font-size', "1em")
          .call(g => g.select('.domain').remove()); 

        const axisCowSub = g => g
          .call(d3.axisTop(abrevScale))
          .attr('transform', "translate(105.5, 80)")
          .attr('font-size', "0.75em")
          .call(g => g.select('.domain').remove());           

        const axisChickenSub = g => g
          .call(d3.axisTop(abrevScale))
          .attr('transform', "translate(560.5, 80)")
          .attr('font-size', "0.75em")
          .call(g => g.select('.domain').remove());    
          
        const axisPigSub = g => g
          .call(d3.axisTop(abrevScale))
          .attr('transform', "translate(1065.5, 80)")
          .attr('font-size', "0.75em")
          .call(g => g.select('.domain').remove());              

        const axisGoatSub = g => g
          .call(d3.axisTop(abrevScale))
          .attr('transform', "translate(1527.5, 80)")
          .attr('font-size', "0.75em")
          .call(g => g.select('.domain').remove());              

        gAxis.call(axisTop);
        gSubCowAxis.call(axisCowSub);
        gSubChickenAxis.call(axisChickenSub);
        gSubPigAxis.call(axisPigSub);
        gSubGoatAxis.call(axisGoatSub);

        function ticked() {
            const u = g
                .selectAll('circle')
                .data(nodes, (d) => d.id)
                .join('circle')
                .style('fill', function(d) {
                    return d.color;
                })
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })      
                .attr('r', function(d) {
                    return d.radius;
                })
          }      

        const simulation = d3.forceSimulation(nodes)
          .force('x', d3.forceX().x(function(d) {
              return xScale(d.item) + subScale(d.scenario);
          }).strength(0.3))
          .force('y', d3.forceY().y(function(d) {
              const index = d.item + "-" + d.scenario;
              return yScales.get(index)(d.region) / 2 + 100;
          }).strength(0.3))
          .force('collision', d3.forceCollide().radius(function(d) {
              return Math.round(d.radius);
          }))
          .on('tick', ticked);

        simulation.alphaDecay(0.1);

        setSim(simulation);
        setInitialized(true);
    }

    if (sim !== null && sim !== undefined) {
        const tempNodes = sim.nodes();
        tempNodes.map(function(d,i) {
            const newRadius = nodes[i].radius;
            d.radius = newRadius;
            return d;
        });
        
        sim.nodes(tempNodes);
        sim.force('x', d3.forceX().x(function(d) {
          return xScale(d.item) + subScale(d.scenario);
        }).strength(0.3))
        .force('y', d3.forceY().y(function(d) {
          const index = d.item + "-" + d.scenario;
          return yScales.get(index)(d.region) / 2 + 100;
        }).strength(0.3));
        sim.alpha(1);
        sim.restart();
    }
  }, [data, extents, yScales])

  return (
    <div className="meatLayoutContainer">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={svgRef}
      >
      </svg>
    </div>
  );
}

export default MeatLayout;