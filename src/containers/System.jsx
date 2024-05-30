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
              </div>
            </Step>
            <Step data={1} key={1}>
              <div
                style={{
                  padding: "50vh 0",
                  opacity: 0.99,
                }}
              >
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
              </div>
            </Step>    
          </Scrollama>        
        </div>
      </div>
  );
}

export default System;
