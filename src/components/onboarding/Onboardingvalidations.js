// formValidations.js
const validateFileType = (file, fileTypePattern) => {
    return file && fileTypePattern.test(file.type);
  };
  // Validation function for Onboarding Documents
  export const validateOnboardingDocuments = (formValues) => {
    let errors = {};
    const allowedFileTypes = /image\/(jpeg|jpg|png)$/; // Allowed MIME types
  
    // Validate Aadhar Name
    if (!formValues.aadharName) {
      errors.aadharName = "Aadhar Name is required";
    }else if (!/^[A-Za-z ]+$/.test(formValues.aadharName)) {
      errors.aadharName = "Aadhar should only contains alphabets"
    }
    // Validate Aadhar Number (12 digits, cannot start with 0)
  if (!formValues.aadharNumber || !/^[1-9]\d{11}$/.test(formValues.aadharNumber)) {
    errors.aadharNumber = "Aadhar number must be 12 digits and cannot start with 0";
  }
  
  
    // Validate PAN Name
    if (!formValues.panName) {
      errors.panName = "PAN Name is required";
    }else if (!/^[A-Za-z ]+$/.test(formValues.panName)) {
      errors.panName = "PanCard  should only contains alphabets "
    }
    // Validate PAN Number (Pattern: 5 letters followed by 4 digits and 1 letter)
    if (
      !formValues.panNumber ||
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formValues.panNumber)
    ) {
      errors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
    }
  
    // File validations
    if (!formValues.aadharDocument) {
      errors.aadharDocument = "Aadhar file is required";
    } else if (!validateFileType(formValues.aadharDocument, allowedFileTypes)) {
      errors.aadharDocument =" Only JPEG/JPG/PNG files are allowed";
    }
    if (!formValues.panDocument) {
      errors.panDocument = "Pan file is required";
    } else if (!validateFileType(formValues.panDocument, allowedFileTypes)) {
      errors.panDocument =" Only JPEG/JPG/PNG files are allowed";
    }
    if (!formValues.higherEducationFile) {
      errors.higherEducationFile = "Higher Education file is required";
    } else if (
      !validateFileType(formValues.higherEducationFile, allowedFileTypes)
    ) {
      errors.higherEducationFile = "Only JPEG/JPG/PNG files are allowed";
    }
  
    // Validate Intermediate/Diploma File (only jpg, jpeg, png)
    if (!formValues.intermediateFile) {
      errors.intermediateFile = "Intermediate/Diploma file is required";
    } else if (!validateFileType(formValues.intermediateFile, allowedFileTypes)) {
      errors.intermediateFile = "Only JPEG/JPG/PNG files are allowed";
    }
  
    // Validate SSC File (only jpg, jpeg, png)
    if (!formValues.sscFile) {
      errors.sscFile = "SSC file is required";
    } else if (!validateFileType(formValues.sscFile, allowedFileTypes)) {
      errors.sscFile = "Only JPEG/JPG/PNG files are allowed";
    }
  
    return errors;
  };
  