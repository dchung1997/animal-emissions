import { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import SolarSystem from "../components/SolarSystem";

import "./System.css";

function System() {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
      <div id="system">
        <figure className="sticky">
            <SolarSystem index={currentStepIndex}/>
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
                    The year is 2022. The COVID-19 pandemic is reaching its peak as the world is still recovering from the initial disruptions to the global economy. 
                    A new record is passed for global greenhouse emissions at 53.8 (Gt CO2eq) an increase of 1.4% as it passes the previous year's record. 
                    As global emissions continue to reach new record highs, no country is close to reaching the 1.5°C limit set up by the Paris Climate Agreement.
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
                  In order for there to be a 67% chance of staying under the 1.5°C limit. Total global emissions from 2020-2100 would need to stay under 500 billion tons of CO2 eq. (Gt CO2eq.)
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
                  Similarly for there to be a 50% chance of staying in that range global emissions would need to stay under 705 billion tons of CO2 equivalent emissions.
                </p>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div
                style={{
                  padding: "40vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                <p>
                  As it currently stands the Meat & Dairy Industry is set to produce approximately 811 billion tons of emissions between 2020 and 2100.                  
                  With Meat and Dairy accounting for around 14.5% of all emissions and more than half of all global food emissions, this alone will push us past the 1.5°C limit. 
                  Meat and Dairy Emissions alone set up a future where the Paris Climate Accords are never met.
                </p>
              </div>
            </Step>  
            <Step data={4} key={4}>
              <div
                style={{
                  padding: "40vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                <p>
                  Accounting for just the total food emissions alone for the carbon budgets of 1.5°C and 2.0°C there is little left for anything else.
                  Without cuts to total food emissions reaching the 1.5°C limit set by the Paris Climate Accord are out of reach. 
                </p>
              </div>
            </Step>       
            <Step data={5} key={5}>
              <div
                style={{
                  padding: "50vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                <p>
                  With total food emissions reaching 1356 Gt by 2100 assuming that there was 67% chance to avoid 2.0°C.
                  There would only be 49 Gt remaining for non-food based emissions. In 2022 global energy emissions alone 
                  reached a new high of 36.8 Gt.
                </p>
              </div>
            </Step>  
            <Step data={6} key={6}>
              <div
                style={{
                  padding: "40vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                <p>
                  As it currently stands the world is getting hotter at an unsustainable rate. Without any change to current emission rates
                  the world temperature will easily surpace 2°C by 2100. 
                  Without any further increases to emissions. Easily doubling the amount of emissions for a 50% chance to stay under the projected 2.0°C.
                </p>
              </div>
            </Step>                 
          </Scrollama>        
        </div>
      </div>
  );
}

export default System;
