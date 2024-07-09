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
    } else if (nutritionCountryRegionData) {
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
                name="Prevalence of moderate+ food insecurity (Population %)"
                title="Food Insecurity Estimates by Region"
              /> :
              <MultiLineChart
                data={currentData}
                name="Prevalence of undernourishment (Population %)"
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
                Malnutrition has continued to be a constant issue over the last few decades.
                While rates have seen a consistent decline across income levels with trends in 
                most parts of the world seeing a consistent decrease. In places such as the 
                Middle East, Africa, and South Asia rates have gone up in recent years.
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
                While issues such as the COVID-19 Pandemic and the Ukrainian War have had 
                considerable contributions towards these issues due to disruptions and
                shortages in the global food supply chain. Many of these regions have
                issues in dealing with self sufficency in their own economies. 
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
                As Climate Change worsens distuptions to the global food supply chain are likely to worsen.
                Under the current climate scenario by 2050 an additional 183 million people are expected
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
                Food Insecurity similarly has been on the rise. While data for this has been limited in its collection
                to fairly recently. Pre-Pandemic levels of Food Insecurity show a gradual increase in Food Insecurity. 
                Across economic levels of all countries with the exception of High Income Countries we similarly see
                an increase. While Lower Middle Income countries saw a sharp increase while Low and Upper Middle Countries
                saw ones that seemed to be plateauing.
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
                However at a regional level where food insecurity occurred and the rate differed by region.
                While in places such as Sub-Saharan Africa show a continual trend upward can be seen. In others
                it tended to be sharp increases or decreases accompanyed by a plateau. This is likely
                due unequal development of economies in the region along with localized issues.
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
                The UN estimates that there will be an approximate 60% increase in food demand by 2050.
                With an estimated 9.6 Billion People, the number of people living in severe food insecurity
                will be up to 1.36 billion. 
              </p>
            </div>
          </Step>                                    
        </Scrollama>
      </div>
    </Container>
  );
}

export default Nutrition;
