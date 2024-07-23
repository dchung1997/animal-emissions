import { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import nutrition_regions from "../assets/undernutrition_regions.json";
import food_security_regions from "../assets/food_security_regions.json";

import nutrition_2018 from '../assets/undernutrition_2018.json';
import food_security_2018 from '../assets/food_security_2018.json';

import WorldMap from "../components/WorldMap";
import MultiLineChart from "../components/MultiLineChart";
import LineChart from "../components/LineChart";

import "./Nutrition.css";

function Nutrition() {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [currentMapData, setCurrentMapData] = useState(null);
  const [nutritionCountryRegionData, setNutritionCountryRegionData] =
    useState(null);
  const [foodSecurityCountryRegionData, setFoodSecurityCountryRegionData] =
    useState(null);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  useEffect(() => {
    function groupByRegion(items) {
      // Create an object to store grouped items
      const regions = {};

      // Loop through each item
      for (const item of items) {
        const region = item.region; // Assuming "region" is the property
        item.date = new Date(item.date);

        // If the region doesn't exist, create an empty array for it
        if (!regions[region]) {
          regions[region] = [];
        }

        // Add the current item to the corresponding region's array
        regions[region].push(item);
      }

      // Return the object containing grouped items
      return regions;
    }

    // Initialize regional data from countries here for use with nutrition regions.
    const nutritionCountryData = groupByRegion(nutrition_regions);
    const foodCountryData = groupByRegion(food_security_regions);

    setNutritionCountryRegionData(nutritionCountryData);
    setFoodSecurityCountryRegionData(foodCountryData);
    setCurrentData(nutritionCountryData);
    setCurrentMapData(nutrition_2018);
  }, []);

  useEffect(() => {
    if (currentStepIndex === 1) {
      setCurrentData(foodSecurityCountryRegionData);
      setCurrentMapData(food_security_2018);
    } else if (nutritionCountryRegionData) {
      setCurrentData(nutritionCountryRegionData);
      setCurrentMapData(nutrition_2018);
    }
  }, [currentStepIndex]);

  return (
    <Container fluid id="nutrition">
      <figure className="sticky">
        <Row>
          <Col xs={1}></Col>
          <Col>
            <h1>Food Security and Undernourishment</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={1}></Col>
          <Col>
            <WorldMap width={800} height={1000} data={currentMapData}/>
          </Col>
          <Col>
            <Row>
              {currentStepIndex === 1 ? (
                <MultiLineChart
                  data={currentData}
                  name="Prevalence of moderate+ food insecurity (Population %)"
                  title="Food Insecurity Estimates by Region"
                />
              ) : (
                <MultiLineChart
                  data={currentData}
                  name="Prevalence of undernourishment (Population %)"
                  title="Undernourishment Estimates by Region"
                />
              )}
            </Row>
            <Row>
              <Col xs={9}>
                <Row>
                  <Col>
                    <LineChart data={currentData} column="Low income" />
                  </Col>
                  <Col>
                    <LineChart
                      data={currentData}
                      column="Lower middle income"
                    />
                  </Col>
                  <Col>
                    <LineChart
                      data={currentData}
                      column="Upper middle income"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={9}>
                <Row>
                  <Col>
                    <LineChart data={currentData} column="High income" />
                  </Col>
                  <Col>
                    <LineChart
                      data={currentData}
                      column="Latin America & Caribbean"
                    />
                  </Col>
                  <Col>
                    <LineChart
                      data={currentData}
                      column="Middle East & North Africa"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={9}>
                <Row>
                  <Col>
                    <LineChart data={currentData} column="Sub-Saharan Africa" />
                  </Col>
                  <Col>
                    <LineChart data={currentData} column="South Asia" />
                  </Col>
                  <Col>
                    <LineChart
                      data={currentData}
                      column="East Asia & Pacific"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <LineChart
                      data={currentData}
                      column="Europe & Central Asia"
                    />
                  </Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </Col>
            </Row>
          </Col>
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
                Undernutrition has continued to be a persistant issue over the
                past few decades. While rates have seen a consistent decline
                across income levels. With trends in most parts of the world
                seeing a gradual decrease. In many places such as the Middle
                East, Africa, and South Asia rates have gone up in recent years.
                It marks a reversal in a trend seen over the last few decades.
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
                While issues such as the COVID-19 Pandemic and the Ukrainian War
                have had some contribution towards these issues causing varying
                disruptions and shortages in the global food supply chain. Many
                of these regions have issues in dealing with self sufficency in
                their own economies.
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
                As Climate Change worsens, disruptions to the global food supply
                chain will worsen. Under the current climate scenario its
                estimated by 2050 an additional 183 million people are expected
                to become undernourished in mostly lower income countries.
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
                Food insecurity similarly has been on the rise. While data for
                this has been limited in its collection to fairly recently.
                Pre-pandemic levels of food insecurity show a gradual increase
                in food insecurity. across economic levels of all countries with
                the exception of High Income Countries we similarly see an
                increase. While Lower Middle Income countries saw a sharp
                increase while Low and Upper Middle Countries saw ones that
                seemed to be plateauing.
              </p>
            </div>
          </Step>
          <Step data={1} key={4}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                However at a regional level where food insecurity occurred and
                the rate differed by region. While in places such as Sub-Saharan
                Africa show a continual trend upward can be seen. In others it
                tended to be sharp increases or decreases accompanyed by a
                plateau. This is likely due unequal development of economies in
                the region along with localized issues.
              </p>
            </div>
          </Step>
          <Step data={1} key={5}>
            <div
              style={{
                padding: "40vh 0",
                opacity: 0.99,
              }}
            >
              <p>
                The UN estimates that there will be an approximate 60% increase
                in food demand by 2050. With an estimated 9.6 Billion People
                recent projections suggest the number of people living in severe
                food insecurity alone will be up to 1.36 billion.
              </p>
            </div>
          </Step>
        </Scrollama>
      </div>
    </Container>
  );
}

export default Nutrition;
