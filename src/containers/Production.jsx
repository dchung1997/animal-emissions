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
                    domain={[0, 2]}
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
                What does it mean to reduce food emissions in the decades to come? 
                In order to reduce carbon emissions in regards to the Paris Accords how exactly would
                a countries expected contribution be in reducing climate change? In 2012 the UN's FAO released
                data on possible pathways towards different scenarios. While they may not be entirely accurate 
                it gives us a glimpse into possible sustainable pathways entering into the mid 21st century and climate
                change.
              </p>
            </div>
          </Step>
          <Step data={0} key={1}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                In 2012 you can see that regions such as East Asia and the Pacifics along with South Asia are some of the largest 
                producers of various livestock. Often with High Income Countries lagging right behind them. It makes sense as these are 
                some of the most heavily populated areas. 
              </p>
            </div>
          </Step>    
          <Step data={0} key={2}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                Some things that stick out are regions such as Latin America and the Caribbeans. Which have a suprisingly
                large number of cattle and poultry. Along with in East Asia and the Pacifics with China and its large production of
                both Poultry and Pigs. In which both regions see only a small percentage of exports for meats with the majority consumed internally.
              </p>
            </div>
          </Step>                    
          <Step data={1} key={3}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                By the year 2030 the population of East Asia and the Pacific peaks. 
                In other places such South Asia and Sub-Saharan Africa we see large population growth.
                In every single scenario the total number of animals each region produces increases. 
                Sub-Saharan Africa seeing the largest gains with it going from the last producer of Poultry to fourth. 
                Efficency of Meat Yields increase all regions and scenarios. But in many gaps begin to form.
              </p>
            </div>
          </Step>
          <Step data={2} key={4}>
            <div
              style={{
                padding: "40vh 0",
                margin: "65vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                In the 2040s total populations of animals for many regions
                begin to slow down as population growth sees little to no change.
                Yields of the poultry and pig meat stagnate in Sub-Saharan Africa and South Asia. 
                Across multiple regions we see meat yields of all scenarios reach a similar baseline to
                high income countries in the 2010s.
              </p>
            </div>
          </Step>
          <Step data={2} key={5}>
            <div
              style={{
                padding: "40vh 0",
                margin: "65vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                While gaps persist in some regions due to varying religious beliefs such as the Middle East and Northern Africa.
                In other regions such as South Asia and Sub-Saharan Africa large population growth continues to contribute to
                stagnant yield growth. While the total number of Goats, Sheep, Cattle continue to grow at rapid rates
                in these regions. 
              </p>
            </div>
          </Step>
          <Step data={3} key={6}>
            <div
              style={{
                padding: "40vh 0",
                margin: "25vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                By the 2050s Sub-Saharan Africa surpases High Income Countries in Poultry production. For South Asia and Sub-Saharan Africa in many scenarios growth rates for meat yields continue to be stagnant. 
                High Income countries continue to remain as one of the largest producers of Poultry and Pigs while
                only accounting for 13% of the World Population.
              </p>
            </div>
          </Step>
          <Step data={3} key={7}>
            <div
              style={{
                padding: "40vh 0",
                margin: "25vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                In regions such as South Asia and Sub-Saharan Africa billions of people are stuck working in subsistance farming.
                While other regions industrialize South Asia and Sub-Saharan Africa are left behind. Due to the methods involved
                in subsistance farming they are often some of the worst greenhouse emitters. 
              </p>
            </div>
          </Step>     
          <Step data={3} key={8}>
            <div
              style={{
                padding: "40vh 0",
                margin: "25vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                Developments in all scenarios showcase a level of inequality in who is producing the most.
                Wealthier nations are producing far more meat per capita than others. While in developing economies
                it is the poorest who are left in poverty like conditions struggling to survive.
              </p>
            </div>
          </Step>
          <Step data={3} key={9}>
            <div
              style={{
                padding: "40vh 0",
                margin: "25vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                The rate of efficency for meat yields for many regions have increased to rates similar of those of developed economies in 2012.
                This comes with additional costs often not seen due to the rise of factory farming in these regions. 
                While it can allow for the intermobility of many of these farmers into working class jobs it often sets up
                inhumane conditions for animals in these farms.
              </p>
            </div>
          </Step> 
          <Step data={3} key={10}>
            <div
              style={{
                padding: "40vh 0",
                margin: "25vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                Is it really possible to reduce the amount of animal emissions? For the world to 
                stay under the 1.5c limit it would require a significant shift in many parts of the world.
                While many parts of the world could reduce the amount of animals they produce 
                for others it can be a case of starvation and food security.
              </p>
            </div>
          </Step>                                           
        </Scrollama>
      </div>
    </Container>
  );
}

export default Production;
