import { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as d3 from "d3";

import MeatLayout from "../components/MeatLayout";
import HorizontalBarChart from "../components/HorizontalBarChart";
import GroupedBarChart from "../components/GroupedBarChart";
import Swatch from '../components/Swatch';

import population from "../assets/UNPopulationProjections.json";
import projections from "../assets/FAOLivestockProjections.json";
import yearItemSums from "../assets/yearItemSums.json";
import medians from "../assets/faoprojections2050median.json";

import "./Production.css";

function Production() {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [livestockData, setLivestockData] = useState(null);
  const [yearSumData, setYearSumData] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [extents, setExtents] = useState(null);
  const [liveStockEfficency, setLiveStockEfficency] = useState(null);

  const years = [2012, 2030, 2040, 2050];

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  function abbreviateLine(line) {
    // Split the line at any word separators (spaces, hyphens, or forward slashes)
    const words = line.split(/\s|\/|-/);
  
    // Create the abbreviation by taking the first letter of each word
    const abbreviation = words.map(word => word[0]).join("");
  
    return abbreviation.toUpperCase(); // Convert abbreviation to uppercase
  }

  useEffect(() => {
    const clonePopulation = structuredClone(population);
    const initialData = projections.filter(function (d) {
      if (d.Year === years[0]) {
        return d;
      }
    });

    const initialSum = yearItemSums.filter(function (d) {
      if (d.Year === years[0]) {
        return d;
      }
    });

    const initialPopulation = clonePopulation.filter(function (d) {
      if (d.year === years[0]) {
        d.value = d.value / 1000000;
        return d;
      }
    });

    const initialEfficency = medians.filter(function (d) {
      if (d.Year === years[0]) {
        return d;
      }
    });

    const sortedSum = initialSum.sort((obj1, obj2) => {
      // Sort by scenario first (ascending order)
      if (obj1.Scenario < obj2.Scenario) return -1;
      if (obj1.Scenario > obj2.Scenario) return 1;

      // If scenarios are the same, sort by item (ascending order)
      if (obj1.Item < obj2.Item) return -1;
      if (obj1.Item > obj2.Item) return 1;

      // If scenarios and items are the same, sort by value (descending order)
      // You can change this to ascending order if needed by swapping < and >
      return obj2.Value - obj1.Value;
    });

    const goat_extent = d3.extent(
      projections.filter(function (d) {
        if (d.Item === "Total Number of Goats and Sheep") {
          return d;
        }
      }),
      (d) => d.Value
    );

    const pig_extent = d3.extent(
      projections.filter(function (d) {
        if (d.Item === "Total Number of Pigs") {
          return d;
        }
      }),
      (d) => d.Value
    );

    const poultry_extent = d3.extent(
      projections.filter(function (d) {
        if (d.Item === "Total Number of Poultry") {
          return d;
        }
      }),
      (d) => d.Value
    );

    const beef_extent = d3.extent(
      projections.filter(function (d) {
        if (d.Item === "Total Number of Cattle") {
          return d;
        }
      }),
      (d) => d.Value
    );

    const goat_median = initialEfficency.filter(function (d) {
      if (d.Item === "Raising of goats") {
        return d;
      }
    });

    const sheep_median = initialEfficency.filter(function (d) {
      if (d.Item === "Raising of sheep") {
        return d;
      }
    });

    const pig_median = initialEfficency.filter(function (d) {
      if (d.Item === "Raising of pigs") {
        return d;
      }
    });

    const poultry_median = initialEfficency.filter(function (d) {
      if (d.Item === "Raising of poultry") {
        return d;
      }
    });

    const cattle_median = initialEfficency.filter(function (d) {
      if (d.Item === "Raising of cattle") {
        return d;
      }
    });

    const buffalo_median = initialEfficency.filter(function (d) {
      if (d.Item === "Raising of buffaloes") {
        return d;
      }
    });

    const grouped_sum = d3.group(sortedSum, (d) => d.Item);
    const efficency = [
      cattle_median,
      buffalo_median,
      poultry_median,
      pig_median,
      goat_median,
      sheep_median,
    ].map(function(d){
      return d.map(function(e) {
        if (e.Region !== e.Region.toLocaleUpperCase()) {
          e.Region = abbreviateLine(e.Region);
        }
        return e;       
      });
    });

    setYearSumData(grouped_sum);
    setPopulationData(initialPopulation);
    setExtents([beef_extent, poultry_extent, pig_extent, goat_extent]);
    setLiveStockEfficency(efficency);
    setLivestockData(initialData);
  }, []);

  useEffect(() => {
    if (currentStepIndex === null || currentStepIndex === undefined) {
      return;
    }
    const clonePopulation = structuredClone(population);
    const data = projections.filter(function (d) {
      if (d.Year === years[currentStepIndex]) {
        return d;
      }
    });

    const sumData = yearItemSums.filter(function (d) {
      if (d.Year === years[currentStepIndex]) {
        return d;
      }
    });

    const popSum = clonePopulation.filter(function (d) {
      if (d.year === years[currentStepIndex]) {
        d.value = d.value / 1000000;
        return d;
      }
    });

    const efficencyData = medians.filter(function (d) {
      if (d.Year === years[currentStepIndex]) {
        return d;
      }
    });

    const sortedSum = sumData.sort((obj1, obj2) => {
      // Sort by scenario first (ascending order)
      if (obj1.Scenario < obj2.Scenario) return -1;
      if (obj1.Scenario > obj2.Scenario) return 1;

      // If scenarios are the same, sort by item (ascending order)
      if (obj1.Item < obj2.Item) return -1;
      if (obj1.Item > obj2.Item) return 1;

      // If scenarios and items are the same, sort by value (descending order)
      // You can change this to ascending order if needed by swapping < and >
      return obj2.Value - obj1.Value;
    });

    const grouped_sum = d3.group(sortedSum, (d) => d.Item);

    const goat_median = efficencyData.filter(function (d) {
      if (d.Item === "Raising of goats") {
        return d;
      }
    });

    const sheep_median = efficencyData.filter(function (d) {
      if (d.Item === "Raising of sheep") {
        return d;
      }
    });

    const pig_median = efficencyData.filter(function (d) {
      if (d.Item === "Raising of pigs") {
        return d;
      }
    });

    const poultry_median = efficencyData.filter(function (d) {
      if (d.Item === "Raising of poultry") {
        return d;
      }
    });

    const cattle_median = efficencyData.filter(function (d) {
      if (d.Item === "Raising of cattle") {
        return d;
      }
    });

    const buffalo_median = efficencyData.filter(function (d) {
      if (d.Item === "Raising of buffaloes") {
        return d;
      }
    });

    const efficency = [
      cattle_median,
      buffalo_median,
      poultry_median,
      pig_median,
      goat_median,
      sheep_median,
    ];

    setPopulationData(popSum);
    setYearSumData(grouped_sum);
    setLiveStockEfficency(efficency);
    setLivestockData(data);
  }, [currentStepIndex]);

  return (
    <Container fluid id="production">
      <figure className="sticky">
        <Row>
          <Col lg={0} xxl={1}></Col>
          <Col>
            <h1>UN Food Projections: 2012 to 2050 </h1>
            <h1 className="right">{currentStepIndex ? years[currentStepIndex] : years[0]}</h1>
          </Col>
        </Row>
        <Row className="vis">
          <Col lg={0} xxl={1}></Col>
          <Col md={12} lg={6} xxl={6}>
            <MeatLayout
              data={livestockData}
              extents={extents}
              yearData={yearSumData}
            />
            <Row>
              <HorizontalBarChart data={populationData} />
            </Row>            
          </Col>
          <Col md={12} lg={6} xxl={4} className="data">
            <Row className="swatch">
              <Swatch/>
            </Row>  
            <Row>
              <Col sm={12} md={6} lg={12}>
                <Row className="efficency" >
                  <GroupedBarChart
                    data={liveStockEfficency ? liveStockEfficency[0] : null}
                    domain={[0, 350]}
                    name="Cattle"
                  />
                </Row>
              </Col>
              <Col sm={12} md={6} lg={12}>
                <Row className="efficency">
                  <GroupedBarChart
                    data={liveStockEfficency ? liveStockEfficency[2] : null}
                    domain={[0, 3]}
                    name="Poultry"
                  />
                </Row>
              </Col>
              <Col sm={12} md={6} lg={12}>
                <Row className="efficency">
                  <GroupedBarChart
                    data={liveStockEfficency ? liveStockEfficency[3] : null}
                    domain={[0, 100]}
                    name="Pig"
                  />
                </Row>   
              </Col>
            </Row>                   
          </Col>
          <Col lg={1} xxl={1}></Col>
        </Row>
      </figure>
      <div className="sampleScroller">
        <Scrollama offset={0.5} onStepEnter={onStepEnter}>
          <Step data={0} key={0}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                The year is 2022. The COVID-19 pandemic is reaching its peak as
                the world is still recovering from the initial disruptions to
                the global economy. A new record is passed for global greenhouse
                emissions at 53.8 (Gt CO2eq) an increase of 1.4% as it passes
                the previous year's record. As global emissions continue to
                reach new record highs, no country is close to reaching the
                1.5°C limit set up by the Paris Climate Agreement.
              </p>
            </div>
          </Step>
          <Step data={1} key={1}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                In order for there to be a 67% chance of staying under the 1.5°C
                limit. Total global emissions from 2020-2100 would need to stay
                under 500 billion tons of CO2 eq. (Gt CO2eq.)
              </p>
            </div>
          </Step>
          <Step data={2} key={2}>
            <div
              style={{
                padding: "40vh 0",
                margin: "65vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                Similarly for there to be a 50% chance of staying in that range
                global emissions would need to stay under 705 billion tons of
                CO2 equivalent emissions.
              </p>
            </div>
          </Step>
          <Step data={3} key={3}>
            <div
              style={{
                padding: "40vh 0",
                margin: "25vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                As it currently stands the Meat & Dairy Industry is set to
                produce approximately 811 billion tons of emissions between 2020
                and 2100. With Meat and Dairy accounting for around 14.5% of all
                emissions and more than half of all global food emissions, this
                alone will push us past the 1.5°C limit. Meat and Dairy
                Emissions alone set up a future where the Paris Climate Accords
                are never met.
              </p>
            </div>
          </Step>
        </Scrollama>
      </div>
    </Container>
  );
}

export default Production;
