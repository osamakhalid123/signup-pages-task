import { InputAdornment, MenuItem } from "@mui/material";
import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import PhoneInput from "react-phone-number-input";
import ReactInputVerificationCode from "react-input-verification-code";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";

function StepperContent({ setStepNumber }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeMissing, setVerificationCodeMissing] = useState("");
  const [showVerificationForm, setShowVerificationForm] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setStepNumber(activeStep);
  }, [activeStep]);

  const steps = [
    {
      label: "Your details",
      Id: 1,
      optional: "Provide your basic information",
      formFields: [
        { name: "Name", label: "Enter your name" },
        { name: "Email", label: "Enter your email" },
        { name: "Phone Number", label: "Phone Number" },
        { name: "Password", label: "Create a password" },
      ],
    },
    {
      label: "Confirmation",
      Id: 2,
      optional: "Confirm your email",

      formFields: [{ name: "confirmationCode" }],
    },
    {
      label: "Store information",
      Id: 3,
      optional: "Set your store main info",

      formFields: [
        {
          name: "Store Name",
          label: "Store Name",
          placeholder: "Type your Store Name",
        },
        { name: "Store URL", label: "Store URL", placeholder: "My Store" },
        {
          name: "Store Language",
          label: "Store Language",
          options: [
            {
              value: "Arabic",
              label: "Arabic",
              flag: "/images/ic_language_ar.svg",
            },
            {
              value: "English",
              label: "English",
              flag: "/images/ic_language_en.svg",
            },
          ],
        },
        {
          name: "Store Industry",
          label: "Store Industry",
          options: [
            { value: "clothing", label: "Clothing" },
            { value: "electronics", label: "Electronics" },
          ],
        },
      ],
    },
  ];

  const stepStyle = {
    "& .Mui-disabled": {
      "&.MuiSvgIcon-root": {
        color: "#F2F4F7",
      },

      "&.MuiStepLabel-label": {
        color: "#344054",
      },
    },
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#7244c8",
      },
      "&.MuiStepLabel-label": {
        color: "#7244c8",
        marginTop: "5px",
      },
    },
    "& .Mui-completed": {
      "&.MuiStepIcon-root": {
        color: "#12B76A",
      },
      "&.MuiStepLabel-label": {
        color: "#12B76A",
        marginTop: "5px",
      },
    },
  };
  const isStepSkipped = (step) => skipped.has(step);
  const isStepOptional = (step) => {
    return steps[step].optional !== undefined;
  };

  const handleNext = () => {
    if (validateForm()) {
      let newSkipped = skipped;
      console.log(newSkipped, "skipped steps");
      console.log(activeStep, "activeStep");
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setShowVerificationForm(true);
    setShowSuccessMessage(false);
  };

  const handleChange = (field, value) => {
    if (field !== "confirmationCode") {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }

    setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
  };

  const validateForm = () => {
    const requiredFields = steps[activeStep].formFields;
    const errors = {};

    for (const { name, label } of requiredFields) {
      const fieldValue = formData[name];

      if (name === "Phone Number") {
        if (!fieldValue || !isValidPhoneNumber(fieldValue)) {
          errors[name] = fieldValue
            ? "must be a valid phone number."
            : `${label} is required.`;
        }
      } else if (name === "Password") {
        if (!fieldValue || fieldValue.length < 8) {
          errors[name] = "Password must be at least 8 characters.";
        }
      } else if (name === "Email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fieldValue || !emailRegex.test(fieldValue)) {
          errors[name] = "Please enter a valid email address.";
        }
      } else if (!fieldValue) {
        errors[name] = `${label} is required.`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    return true;
  };
  const handleVerificationCodeChange = (value) => {
    setVerificationCode(value);
    setVerificationCodeMissing(false);

    // Set confirmationCode value when handling verificationCode change
    setFormData((prevData) => ({ ...prevData, confirmationCode: value }));
  };

  const handleVerifyClick = () => {
    const verificationSuccessful = true;

    if (verificationSuccessful && verificationCode) {
      setShowVerificationForm(false);
      setShowSuccessMessage(true);
    } else {
      setVerificationCodeMissing(true);
    }
  };

  const renderButtons = () => {
    const currentStep = steps[activeStep];

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 2,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {currentStep.Id === 1 && (
          <>
            <Button onClick={handleNext}>Get Started</Button>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", marginY: 3 }}>
                <Typography variant="h5">Already have an account ?</Typography>
                <button>Log in</button>
              </Box>
              <Typography variant="h5">عربى</Typography>
            </Box>
          </>
        )}
        {currentStep.Id === 2 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: 2,
              justifyContent: "center",
            }}
          >
            <Box />
            {showSuccessMessage && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button onClick={handleNext}>Continue</Button>
                <button className="BackLogBtn" onClick={handleReset}>
                  &larr; Back to log in
                </button>
              </Box>
            )}
          </Box>
        )}
        {currentStep.Id === 3 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pt: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleNext}>Save</Button>
            <button className="BackLogBtn" onClick={handleReset}>
              &larr; Back to log in
            </button>
          </Box>
        )}
      </Box>
    );
  };

  const renderFormField = ({ name, label, placeholder, options }) => {
    const isPhoneNumber = name === "Phone Number";
    const isPassword = name === "Password";
    const isStoreUrl = name === "Store URL";

    return (
      <Box
        key={name}
        sx={{
          marginTop: 5,
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {label && <InputLabel>{label}*</InputLabel>}
        {isPhoneNumber ? (
          <>
            <PhoneInput
              placeholder="Enter phone number"
              value={formData[name] || ""}
              defaultCountry="EG"
              onChange={(value) => handleChange(name, value)}
            />
            {fieldErrors[name] && (
              <Typography color="error">{fieldErrors[name]}</Typography>
            )}
          </>
        ) : isPassword ? (
          <>
            <TextField
              type="password"
              placeholder={label}
              value={formData[name] || ""}
              onChange={(e) => handleChange(name, e.target.value)}
              margin="normal"
              variant="outlined"
              error={Boolean(fieldErrors[name])}
              helperText={fieldErrors[name]}
              required
              InputLabelProps={{ shrink: false }}
            />
          </>
        ) : (
          <>
            {steps[activeStep].Id === 1 && (
              <TextField
                placeholder={label}
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
                margin="normal"
                variant="outlined"
                error={Boolean(fieldErrors[name])}
                helperText={fieldErrors[name]}
                required
                InputLabelProps={{ shrink: false }}
              />
            )}
            {steps[activeStep].Id === 2 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pt: 2,
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {showVerificationForm && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginY: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src="/images/Featured icon.svg" />
                    <Typography variant="h4">Check Your Email </Typography>
                    <Typography variant="h5">
                      We have sent a verification code to
                    </Typography>
                    <Typography sx={{ marginY: "8px" }} variant="h5">
                      {formData.Email}
                    </Typography>

                    {verificationCodeMissing && (
                      <Typography color="error">
                        Please enter the verification code.
                      </Typography>
                    )}
                    <ReactInputVerificationCode
                      placeholder=""
                      onChange={handleVerificationCodeChange}
                    />
                    <Button sx={{ mt: 5 }} onClick={handleVerifyClick}>
                      Verify email
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginY: 3,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5">
                        Didn't receive the email?
                      </Typography>
                      <button>Click to resend</button>
                    </Box>
                    <button className="BackLogBtn" onClick={handleReset}>
                      &larr; Back to log in
                    </button>
                  </Box>
                )}

                {showSuccessMessage && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginY: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src="/images/success icon.svg" />
                    <Typography variant="h4">Email Verified</Typography>
                    <Typography variant="h5">
                      Your account has been verified successfully
                    </Typography>
                    <Typography variant="h5">
                      Click below to setup your store.
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
            {steps[activeStep].Id === 3 &&
              (isStoreUrl ? (
                <Box className="storeURL">
                  <TextField
                    placeholder={placeholder}
                    value={formData[name] || ""}
                    onChange={(e) => handleChange(name, e.target.value)}
                    margin="normal"
                    variant="outlined"
                    error={Boolean(fieldErrors[name])}
                    helperText={fieldErrors[name]}
                    required
                    InputLabelProps={{ shrink: false }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <span className="URLend">.markatty.com</span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              ) : (
                <TextField
                  {...(options && {
                    select: true,
                    sx: { width: "200px" },
                    value: formData[name] || options[0]?.value || "",
                    onChange: (e) => handleChange(name, e.target.value),
                    margin: "normal",
                    variant: "outlined",
                    error: Boolean(fieldErrors[name]),
                    helperText: fieldErrors[name],
                    required: true,
                    InputLabelProps: { shrink: false },
                  })}
                >
                  {options &&
                    options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.flag && (
                          <img
                            src={option.flag}
                            alt={option.label}
                            height="20"
                          />
                        )}
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
              ))}
          </>
        )}
      </Box>
    );
  };

  return (
    <>
      <Stepper className="StepperStyle" activeStep={activeStep} sx={stepStyle}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="textSecondary">
                {step.optional}
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </Box>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <Box sx={{ paddingY: "60px" }}>
          {steps[activeStep].formFields.map(renderFormField)}
          {renderButtons()}
        </Box>
      )}
    </>
  );
}

export default StepperContent;
