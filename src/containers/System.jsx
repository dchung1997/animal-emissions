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
                  padding: "50vh 0",
                  opacity: 0.99,
                }}
              >
                  <p>In the United States there are a total of around 19,792 Dollar Generals.</p>
              </div>
            </Step>
            <Step data={1} key={1}>
              <div
                style={{
                  padding: "50vh 0",
                  opacity: 0.99,
                }}
              >
                  <p>Approximately 2 out of 3 of Dollar Generals are located in towns, suburbs, and rural areas with less than 15,000 people in them.</p>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div
                style={{
                  padding: "50vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                  <p>About 1139 Dollar Generals were located in places with 15,000 - 10,000 individuals.</p>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div
                style={{
                  padding: "50vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                  <p>The number rose to 1835 locations for places with 10,000 - 5,000 individuals.</p>
              </div>
            </Step>  
            <Step data={4} key={4}>
              <div
                style={{
                  padding: "50vh 0",
                  margin: "65vh 0",
                  opacity: 0.99,
                }}
              >
                  <p>The largest share of locations was between the range of 5,000 - 1,000 locations with 4397 locations.</p>
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
                  <p>In more remote areas with less than 1,000 people there were around 2,276 Dollar Generals.</p>
              </div>
            </Step>    
          </Scrollama>        
        </div>
      </div>
  );
}

export default System;
