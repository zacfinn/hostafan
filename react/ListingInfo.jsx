import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Card, Button } from "@material-ui/core";
import logosquare from "../../assets/images/hostafan/logosquare.png";

const ListingInfo = (props) => {
  const listing = props.listing;
  const host = props.listing.createdBy;
  const [hostName, setHostName] = useState();

  const viewMore = () => {
    props.viewMore(listing);
  };

  useEffect(() => {
    if (host.mi) {
      setHostName(`${host.firstName} ${host.mi}. ${host.lastName}`);
    } else {
      setHostName(`${host.firstName} ${host.lastName}`);
    }
  }, []);

  return (
    <Fragment>
      <Card className="card-box mb-4 p-5">
        <Grid container spacing={4} className="mb-1">
          <Grid item xs={12} md={5}>
            <img
              alt="..."
              className="card-img-top rounded"
              height={200}
              width={200}
              src={listing.event.imageUrl}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <p className="font-size-xxl d-block my-4">{listing.title}</p>
            <p className="text-black-50 font-size-md">
              {listing.shortDescription}
            </p>
            <div className="d-flex align-items-center mt-4">
              <div className="avatar-icon-wrapper avatar-icon-lg  mr-2">
                <div className="avatar-icon">
                  <img
                    alt="..."
                    src={
                      listing.createdBy
                        ? listing.createdBy.avatarUrl
                          ? listing.createdBy.avatarUrl
                          : logosquare
                        : logosquare
                    }
                  />
                </div>
              </div>
              <div>
                <p className="font-weight-bold text-black">
                  {hostName ? hostName : "Loading host details..."}
                </p>
                <span className="text-black-50 d-block">
//Proprietary code removed
                </span>
              </div>
            </div>
          </Grid>
          <Grid container justify="flex-end" className="float-right">
            <Button
              onClick={viewMore}
              className="bg-plum-plate text-white float-right"
              variant="contained"
            >
              View More
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
};

ListingInfo.propTypes = {
  listing: PropTypes.shape({
//Proprietary code removed
    }),
  }),
  viewMore: PropTypes.func.isRequired,
};

export default ListingInfo;
