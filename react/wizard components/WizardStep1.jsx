import React, { useState, useEffect } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import listingSchema from "../../schemas/listingSchema";
import * as hostProfileService from "../../services/hostProfileService";
import FileUpload from "../FileUpload";
//Proprietary code removed
import {
  Card,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";

//Proprietary code removed

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
//Proprietary code removed
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
//Proprietary code removed
  }),
  values: PropTypes.shape({
//Proprietary code removed
  }),
  touched: PropTypes.shape({
//Proprietary code removed
  }),
  errors: PropTypes.shape({
//Proprietary code removed
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
    //Proprietary code removed
  }),

  validationSchema: listingSchema,

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(WizardStep1);
