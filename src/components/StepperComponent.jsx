import { Container } from "@mui/material";
import React from "react";
import StepperContent from "./StepperContent";

const StepperComponent = ({setStepNumber}) => {
  return (
    <Container >
      <StepperContent 
      setStepNumber={setStepNumber}
      />
    </Container>
  );
};

export default StepperComponent;