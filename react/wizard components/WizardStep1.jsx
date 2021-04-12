import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import listingSchema from "../../schemas/listingSchema";
import * as hostProfileService from "../../services/hostProfileService";
import FileUpload from "../FileUpload";
import logger from "sabio-debug";
import {
  Card,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";

const _logger = logger.extend("listings");

const WizardStep1 = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  const [hostProfiles, setHostProfiles] = useState();

  useEffect(() => {
    hostProfileService
      .getCreatedBy()
      .then(onGetCreatedBySuccess)
      .catch(onGetCreatedByError);
  }, []);

  useEffect(() => {
    onChange();
  }, [values]);

  const onChange = () => {
    props.onChange(values);
  };

  const mapHostProfiles = (profile) => {
    return (
      <MenuItem key={profile.id} value={profile.id}>
        {`${profile.housingType.name} on ${profile.location.lineOne}, ${profile.location.city}, ${profile.location.state.code} for
        ${profile.guestCapacity} guests`}
      </MenuItem>
    );
  };

  const updateUrl = (url, setFieldValue) => {
    _logger("UpdateUrl firing", url);

    setFieldValue("imageUrl", url[0].url);
  };

  const onGetCreatedBySuccess = (res) => {
    _logger(res);
    setHostProfiles(res.items.map(mapHostProfiles));
  };
  const onGetCreatedByError = (err) => _logger(err);

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-4 mb-4">
        <div className="font-size-lg font-weight-bold">Event information</div>
        <Divider className="my-4" />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="p-3">
              <TextField
                fullWidth
                className="m-2"
                id="name"
                name="title"
                label="Name"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                variant="outlined"
              />
              <TextField
                fullWidth
                className="m-2"
                id="outlined-select-currency"
                name="serviceProfileId"
                select
                label="Listing Profile"
                value={values.serviceProfileId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.serviceProfileId && Boolean(errors.serviceProfileId)
                }
                helperText={touched.serviceProfileId && errors.serviceProfileId}
                variant="outlined"
              >
                {hostProfiles ? hostProfiles : <MenuItem>Loading...</MenuItem>}
              </TextField>
              <TextField
                fullWidth
                className="m-2"
                id="outlined-textarea"
                name="shortDescription"
                label="Short Description"
                value={values.shortDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.shortDescription && Boolean(errors.shortDescription)
                }
                helperText={touched.shortDescription && errors.shortDescription}
                multiline
                variant="outlined"
              />
              <TextField
                fullWidth
                className="m-2 mb-4"
                id="outlined-textarea"
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                multiline
                variant="outlined"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <FileUpload
              updateUrl={(response) => {
                updateUrl(response, setFieldValue);
              }}
              isMultiple={true}
            />
          </Grid>
          <Button
            type="submit"
            className="mx-2"
            color="primary"
            variant="contained"
          >
            {props.nextLabel}
          </Button>
        </Grid>
      </Card>
    </form>
  );
};

WizardStep1.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    serviceTypeId: PropTypes.number.isRequired,
    serviceProfileId: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    additionalServices: PropTypes.bool.isRequired,
    rideshareId: PropTypes.number.isRequired,
    rideshareCost: PropTypes.number.isRequired,
  }),
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    serviceTypeId: PropTypes.number.isRequired,
    serviceProfileId: PropTypes.number.isRequired,
    eventId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    additionalServices: PropTypes.bool.isRequired,
    rideshareId: PropTypes.number.isRequired,
    rideshareCost: PropTypes.number.isRequired,
  }),
  touched: PropTypes.shape({
    title: PropTypes.bool,
    serviceTypeId: PropTypes.bool,
    serviceProfileId: PropTypes.bool,
    eventId: PropTypes.bool,
    description: PropTypes.bool,
    shortDescription: PropTypes.bool,
    amenities: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.bool })),
    additionalServices: PropTypes.bool,
    rideshareId: PropTypes.bool,
    rideshareCost: PropTypes.bool,
  }),
  errors: PropTypes.shape({
    title: PropTypes.string,
    serviceTypeId: PropTypes.string,
    serviceProfileId: PropTypes.string,
    eventId: PropTypes.string,
    description: PropTypes.string,
    shortDescription: PropTypes.string,
    amenities: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    additionalServices: PropTypes.string,
    rideshareId: PropTypes.string,
    rideshareCost: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    title: props.formData.title,
    serviceTypeId: props.formData.serviceTypeId,
    serviceProfileId: props.formData.serviceProfileId,
    eventId: props.formData.eventId,
    description: props.formData.description,
    shortDescription: props.formData.shortDescription,
    amenities: props.formData.amenities,
    additionalServices: props.formData.additionalServices,
    rideshareId: props.formData.rideshareId,
    rideshareCost: props.formData.rideshareCost,
  }),

  validationSchema: listingSchema,

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(WizardStep1);
