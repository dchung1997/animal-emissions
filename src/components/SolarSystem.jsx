import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import greenEarth from '../assets/greenEarth.svg';
import yellowEarth from '../assets/yellowEarth.svg';
import orangeEarth from '../assets/orangeEarth.svg';
import redEarth from '../assets/redEarth.svg';

import './SolarSystem.css'

function SolarSystem({index}) {
  const svgRef = useRef(null);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const height = 1080;
  const width = 1080;
  const [data, setData] = useState([
    {
        name: "2022",
        value: "53.8",
        w: width / 2
    },
    {
        name: "1.5* C Budget (67% Chance)",
        value: "500",
        w: width * 2
    },
    {
        name: "1.5* C Budget (50% Chance)",
        value: "705",
        w: width * 3
    },
    {
      name: "Meat Emissions Alone (Business as Usual)",
      value: "811",
      w: width * 4
    },    
    {
        name: "Food Emissions Alone (Business as Usual)",
        value: "1356",
        w: width * 5
    },
    {
        name: "2.0* C Budget (67% Chance)",
        value: "1405",
        w: width * 6
    },
    {
        name: "2.0* C Budget (50% Chance)",
        value: "1816",
        w: width * 7
    },    
  ]);


  useEffect(() => {
    if (index === null || index === undefined) return;
    if (prevIndex === index) return;
    if (prevIndex === -1) {
      setPrevIndex(index);
    }

    const svg = d3.select(svgRef.current);
    const systemScale = d3.scaleLinear().domain([50, 1816]).range([100, 350]);

    if (prevIndex !== index && initialized) {
      const g = svg.select("g");
      const gLineTop = g.selectAll("line.top");
      const gLineBottom = g.selectAll("line.bottom");
      const gCircle = g.selectAll("circle");
      const gImage = g.selectAll("image")
      const gText = g.selectAll("text");

      const gLegend = g.selectAll("circle.legend");

      const tempData = data;
      tempData[index].w = width/2;

      if (index - 1 >= 0) {
        tempData[index-1].w = -width;
      }

      if (index + 1 < data.length) {
        tempData[index+1].w = width * 2;
      }
      
      gLineTop.data(tempData)
        .transition()
        .delay(100)
        .duration(2000)
        .attr("x1", function(d){
          return d.w;
        })
        .attr("x2", function(d){
          return d.w;                       
        });

      gLineBottom.data(tempData)
        .transition()
        .delay(100)
        .duration(2000)
        .attr("x1", function(d){
          return d.w;
        })
        .attr("x2", function(d){
          return d.w;                       
        });

      gCircle.data(tempData)
        .transition()
        .delay(100)
        .duration(2000)
        .attr("cx", function(d,i) {
          return d.w;
        });

      gImage.data(tempData)
        .transition()
        .delay(100)
        .duration(2000)
        .attr("x", function(d,i) {
          return d.w - systemScale(d.value);
        });        


      gText.data(tempData)
        .transition()
        .delay(100)
        .duration(2000)
        .attr("x", function(d) {
          return d.w;
        });

      gLegend.attr("fill", function(d,i){
        if ((index == 3 || index == 4) && i == index) {
          return "red"
        }
        return "none";
      });

      gLegend.attr("opacity", function(d,i){
        if ((index == 3 || index == 4) && i == index) {
          return "0.5"
        }
        return "1";
      });      

      gLegend.attr("stroke", function(d,i) {
        if (i === index) {
          return "red";
        } 

        if (i == 3 || i == 4) {
          return "none";
        }

        return "white";
      });

      setData(tempData);
      setPrevIndex(index);
      return;
    }

    const g = svg.append("g");

    const gLineTop = g.selectAll("line.top")
                      .data(data)
                      .join("line")
                      .attr("class", "top")
                      .attr("stroke", function(d) {
                        return "white";
                      })
                      .attr("x1", function(d){
                        return d.w;
                      })
                      .attr("x2", function(d){
                        return d.w;                       
                      })                     
                      .attr("y1", function(d){
                        return height / 2.5 - systemScale(d.value) - 10;
                      })    
                      .attr("y2", function(d){
                        return height / 2.5 - systemScale(d.value) - 50;                        
                      });

        const gLineBottom = g.selectAll("line.bottom")
                      .data(data)
                      .join("line")
                      .attr("class", "bottom")
                      .attr("stroke", function(d) {
                        return "white";
                      })
                      .attr("x1", function(d){
                        return d.w;                       
                      })
                      .attr("x2", function(d){
                        return d.w;                                             
                      })                     
                      .attr("y1", function(d){
                        return height / 2.5 + systemScale(d.value) + 10;
                      })    
                      .attr("y2", function(d){
                        return height / 2.5 + systemScale(d.value) + 100;                        
                      });
        
    const gCircle = g.selectAll("clipPath")
                .data(data)
                .join("clipPath")
                .append("circle")
                .attr("cx", function(d) {
                  return d.w;                       
                })
                .attr("cy", function(d) {
                    return height / 2.5;
                })
                .attr("r", function(d) {
                    return systemScale(d.value)
                });    
                
    const gText = g.selectAll("text")
                .data(data)
                .join("text")
                .attr("text-anchor", "middle")
                .attr("font-family", "Arial")
                .attr("font-size", "16px")
                .attr("stroke", "none")
                .attr("fill", "white")                
                .attr("x", function(d) {
                  return d.w;                       
                })
                .attr("y", function(d) {
                    return height / 2.5 - systemScale(d.value) - 60;
                })
                .text(function(d){
                    return d.name;
                });

    const gClipPath = g.selectAll("clipPath")
                .attr("id", function(d,i) {
                  return i;
                });
                
    const gImage = g.selectAll("image")
                .data(data)
                .join("image")
                .attr("clip-path", function(d, i) {
                  return 'url(#' + i + ')';
                })
                .attr("x", function(d) {
                  return d.w - systemScale(d.value);
                })
                .attr("y", function(d){
                  return height / 2.5 - systemScale(d.value);
                })
                .attr("width", function(d) {
                  return 2 * systemScale(d.value);
                })
                .attr("height", function(d) {
                  return 2 * systemScale(d.value);
                })
                .attr("href", function(d,i) {
                  if (i == 0) {
                    return './greenEarth.svg';
                  } else if (i <= 2 && i >= 1) {
                    return './yellowEarth.svg';
                  } else if (i == 4 || i == 3){
                    return './orangeEarth.svg';
                  } else if (i > 4) {
                    return './redEarth.svg';
                  }
                });
    
    const valuesToShow = [53.8, 500, 705, 811, 1356, 1405, 1816];
    const textToShow = [53.8, 500, 705, 1405, 1816];

    const size = d3.scaleLinear()
    .domain([56, 1816])  
    .range([1, 100])  
    
    const xCircle = 930
    const xLabel = 1080
    const yCircle = 800
    g.selectAll("circle.legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("class", "legend")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return yCircle - size(d) } )
        .attr("r", function(d){ return size(d) })
        .attr("fill", "none")
        .attr("stroke", function(d,i) {
          if (i == 0) {
            return "red";
          }

          if (i == 3 || i == 4) {
            return "none";
          }

          return "white";
        })

    if (windowWidth > 1300) {
      g.selectAll("line.legend")
      .data(textToShow)
      .enter()
      .append("line")
        .attr("class", "legend")
        .attr('x1', function(d){ return xCircle + size(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return yCircle - size(d) } )
        .attr('y2', function(d){ return yCircle - size(d) } )
        .attr('stroke', 'white')
        .style('stroke-dasharray', ('2,2'))

    g.selectAll("text.legend")
      .data(textToShow)
      .enter()
      .append("text")
        .attr("class", "legend")
        .attr('x', xLabel)
        .attr('y', function(d){ return yCircle - size(d) } )
        .text( function(d){ return d })
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')
        .attr("fill", "white")        
    }

    setInitialized(true);

  }, [index, windowWidth]); 

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    // Cleanup function to remove the listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);  

  return (
    <div className='horizontalContainer'>
      <svg viewBox={`0 0 ${width} ${height}`} ref={svgRef}></svg>
    </div>
  )
}

export default SolarSystem