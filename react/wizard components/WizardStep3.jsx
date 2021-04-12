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
    handleChange,
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
                  select
//Proprietary code removed
                  onChange={handleChange}
                  variant="outlined"
                >
//Proprietary code removed
                </TextField>
                <TextField
                  fullWidth
                  className="m-2 mb-4"
                  type="number"
//Proprietary code removed
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
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  onBack: PropTypes.func,
};

export default withFormik({
  mapPropsToValues: (props) => ({
//Proprietary code removed
  }),

  validationSchema: listingSchema,

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(WizardStep3);
