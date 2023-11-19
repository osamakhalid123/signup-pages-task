import "react-phone-number-input/style.css";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import RightSectionImage from "./RightSectionImage";
import StepperComponent from "./StepperComponent";

export default function StepForm() {


  const[stepNumber,setStepNumber]=useState(0)
 
  return (
    <div style={{display:"flex"}}>
      <Container sx={{ width: "50%" }}>
        <Header />
        <StepperComponent
       setStepNumber={setStepNumber}
      />
        <Footer />
      </Container>
      <Box sx={{ width: "50%" }}>

        <RightSectionImage stepNumber={stepNumber}/>
      </Box>
    </div>
  );
}
