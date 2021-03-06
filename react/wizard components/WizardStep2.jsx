import React, { useEffect } from "react";
import { withFormik, FieldArray, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import listingSchema from "../../schemas/listingSchema";
import { Card, Divider, Grid, Button, Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const WizardStep2 = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    nextLabel,
    backLabel,
    onBack,
  } = props;

  const onChange = () => {
    props.onChange(values);
  };

  const backClicked = () => {
    onBack(values);
  };

  useEffect(() => {
    onChange();
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-4 mb-4">
        <div className="font-size-lg font-weight-bold">Amenities</div>
        <Divider className="my-4" />
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <FieldArray name="amenities">
              {({ remove, push }) => (
                <div className="mb-5">
                  {" "}
                  {values.amenities.length > 0 &&
                    values.amenities.map((amenity, index) => (
                      <div className="p-3" key={index}>
                        <TextField
                          fullWidth
                          className="m-2"
                          id="name"
                          name={`amenities.${index}.name`}
                          label="Amenity"
                          onChange={handleChange}
                          value={values.amenities[index].name}
                          onBlur={handleBlur}
                          error={touched.amenities && Boolean(errors.amenities)}
                          variant="outlined"
                        />
                        <ErrorMessage name={`amenities.${index}.name`}>
                          {(msg) => (
                            <p
                              className="error-message text-left text-small"
                              style={{ color: "red" }}
                            >
                              {msg}
                            </p>
                          )}
                        </ErrorMessage>
                        <Fab
                          className="my-3 mx-3"
                          size="small"
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon />
                        </Fab>
                        <Fab
                          className="my-3 mx-1"
                          size="small"
                          onClick={() => push({ name: "" })}
                        >
                          <AddIcon />
                        </Fab>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>
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

WizardStep2.propTypes = {
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
})(WizardStep2);
