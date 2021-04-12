import React, { useEffect } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import listingSchema from "../../schemas/listingSchema";
import {
  Card,
  Divider,
  FormControlLabel,
  Checkbox,
  TextField,
  Grid,
  MenuItem,
  Button,
} from "@material-ui/core";

const WizardStep3 = (props) => {
  const {
    values,
    //touched,
    //errors,
    handleChange,
    //handleBlur,
    handleSubmit,
    nextLabel,
    backLabel,
    onBack,
  } = props;

  useEffect(() => {
    onChange();
  }, [values]);

  const onChange = () => {
    props.onChange(values);
  };

  const backClicked = () => {
    onBack(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-4 mb-4">
        <Divider className="my-4" />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.additionalServices}
                  onChange={handleChange}
                  name="additionalServices"
                  value={values.additionalServices}
                />
              }
              label="Rideshare to event offered?"
            />
            {values.additionalServices ? (
              <div>
                <TextField
                  fullWidth
                  className="m-2 mb-4"
                  name="rideshareId"
                  select
                  label="Rideshare Profile"
                  value={values.rideshareId}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value={0}>
                    No rideshare profiles associated with account
                  </MenuItem>
                  {/*the following menu items will be populated with an api call to rideshares on next PR*/}
                  <MenuItem value={1}>1990 Honda Civic</MenuItem>
                  <MenuItem value={2}>1987 Ford Pinto</MenuItem>
                  <MenuItem value={3}>1999 Toyota Camry</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  className="m-2 mb-4"
                  type="number"
                  name="rideshareCost"
                  label="Rideshare Price"
                  value={values.rideshareCost}
                  onChange={handleChange}
                  variant="outlined"
                ></TextField>
              </div>
            ) : (
              <div></div>
            )}
            <Button
              type="button"
              className="mx-4"
              color="secondary"
              variant="contained"
              onClick={backClicked}
            >
              {backLabel}
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {nextLabel}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

WizardStep3.propTypes = {
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
  //handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  onBack: PropTypes.func,
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
})(WizardStep3);
