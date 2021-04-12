import React, { Fragment, useState } from "react";
import Loki from "react-loki";
import WizardStep1 from "../components/forms/WizardStep1";
import WizardStep2 from "../components/forms/WizardStep2";
import WizardStep3 from "../components/forms/WizardStep3";
import WizardStep4 from "../components/forms/WizardStep4";
import * as listingService from "../services/listingService";
//Proprietary code removed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faTv,
  faCar,
  faArchway,
} from "@fortawesome/free-solid-svg-icons";
import "../components/forms/LokiStyling.css";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
//Proprietary code removed

const ListingWizard = () => {
  const [formData, setFormData] = useState({
    title: "",
    serviceTypeId: 1,
    serviceProfileId: 0,
//Proprietary code removed
    description: "",
    shortDescription: "",
    amenities: [{ name: "" }],
    additionalServices: false,
//Proprietary code removed
  });
  const [snackbarState, setSnackbarState] = useState({
    display: false,
    severity: null,
    message: "",
  });

  const onFinish = (values) => {
    setFormData(values);
    let inputData = { ...values };
    inputData.amenities = inputData.amenities
      .map((amenity) => amenity.name)
      .filter(Boolean);
//Proprietary code removed
    listingService
      .createListing(inputData)
      .then(onCreateListingSuccess)
      .catch(onCreateListingError);
  };

  const onChange = (values) => {
    setFormData(values);
  };

  const handleCloseSnackbar = () =>
    setSnackbarState({
      display: false,
      severity: "info",
      message: "",
    });

  const wizardSteps = [
    {
      label: "Step 1",
      icon: <FontAwesomeIcon icon={faMapMarkedAlt} className="mt-3" />,
      component: <WizardStep1 formData={formData} onChange={onChange} />,
    },
    {
      label: "Step 2",
      icon: <FontAwesomeIcon icon={faTv} className="mt-3" />,
      component: <WizardStep2 formData={formData} onChange={onChange} />,
    },
    {
      label: "Step 3",
      icon: <FontAwesomeIcon icon={faCar} className="mt-3" />,
      component: <WizardStep3 formData={formData} onChange={onChange} />,
    },
    {
      label: "Step 3",
      icon: <FontAwesomeIcon icon={faArchway} className="mt-3" />,
      component: <WizardStep4 formData={formData} onChange={onChange} />,
    },
  ];

  const onCreateListingSuccess = (res) => {
    _logger(res);
    setSnackbarState({
      display: true,
      severity: "success",
      message: "Listing created!",
    });
  };
  const onCreateListingError = (err) => {
    _logger(err);
    setSnackbarState({
      display: true,
      severity: "error",
      message: "Oops, something went wrong.",
    });
  };

  return (
    <Fragment>
      <div className="myWizard">
        <Loki
          steps={wizardSteps}
          onNext={onChange}
          onBack={onChange}
          onFinish={onFinish}
          nextLabel="Next"
          backLabel="Back"
          noActions
        />
        <Snackbar
          open={snackbarState.display}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarState.severity}
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </div>
    </Fragment>
  );
};

export default ListingWizard;
