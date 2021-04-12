import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Grid, Card, CardContent, Button } from "@material-ui/core";

const Listing = (props) => {
  const listing = props.listing;

  const viewMore = () => {
    props.viewMore(listing);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card
          className="mb-4"
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <img
            alt="..."
            className="card-img-top"
            height={350}
            width={200}
            src={listing.event.imageUrl}
          />
          <CardContent className="p-3">
            <h5 className="card-title font-weight-bold font-size-lg">
              {listing.title}
            </h5>
            <p className="card-text">{listing.shortDescription}</p>
            <Button
              onClick={viewMore}
              className="bg-plum-plate text-white"
              variant="contained"
            >
              View More
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  );
};

Listing.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    event: PropTypes.shape({ imageUrl: PropTypes.string.isRequired }),
  }),
  viewMore: PropTypes.func.isRequired,
};

export default Listing;
