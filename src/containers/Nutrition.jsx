import { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import nutrition_regions from "../assets/undernutrition_regions.json";
import food_security_regions from "../assets/food_security_regions.json";

import MultiLineChart from "../components/MultiLineChart";
import LineChart from "../components/LineChart";

import "./Nutrition.css";

function Nutrition() {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [nutritionCountryRegionData, setNutritionCountryRegionData] = useState(null);
  const [foodSecurityCountryRegionData, setFoodSecurityCountryRegionData] = useState(null);

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
    setCurrentData(nutritionCountryData)
  }, []);

  useEffect(() => {
    if (currentStepIndex === 1) {
      setCurrentData(foodSecurityCountryRegionData);
    } else {
      setCurrentData(nutritionCountryRegionData)
    }

  }, [currentStepIndex])

  return (
    <Container fluid id="nutrition">
      <figure className="sticky">
        <Row>
          <Col xs={0} xxl={2}></Col>
          <Col>
            <h1>Food Security and Undernourishment</h1>
          </Col>
          <Col>
            {currentStepIndex === 1 ?
              <MultiLineChart
                data={currentData}
                name="Prevalence of moderate to severe food insecurity (% of population)"
                title="Food Insecurity Estimates by Region"
              /> :
              <MultiLineChart
                data={currentData}
                name="Prevalence of undernourishment (% of population)"
                title="Undernourishment Estimates by Region"
              />
            }
          </Col>
          <Col xs={0} xxl={2}></Col>
        </Row>
        <Row>
          <Col></Col>
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
              <Col>
                <LineChart data={currentData} column="High income" />
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={7}>
            <Row>
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
              <Col>
                <LineChart
                  data={currentData}
                  column="Sub-Saharan Africa"
                />
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={7}>
            <Row>
              <Col>
                <LineChart data={currentData} column="South Asia" />
              </Col>
              <Col>
                <LineChart
                  data={currentData}
                  column="East Asia & Pacific"
                />
              </Col>
              <Col>
                <LineChart
                  data={currentData}
                  column="Europe & Central Asia"
                />
              </Col>
            </Row>
          </Col>
          <Col></Col>
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
        </Scrollama>
      </div>
    </Container>
  );
}

export default Nutrition;
