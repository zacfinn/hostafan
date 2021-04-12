import React, { Fragment } from "react";
import PropTypes from "prop-types";
import * as dateService from "../../services/dateService";

import ListingReservation from "./ListingReservation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Grid, Container, Card } from "@material-ui/core";

import Slider from "react-slick";

const ShowListingDetails = (props) => {
  const [parking, setParking] = React.useState(false);
  const [rideshare, setRideshare] = React.useState(false);

  const details = props.details;
  let rideshareCost = 0;
  let parkingCost = 0;

  const hasServices = (details) => {
    if (details.services) {
      details.services.forEach((service) => {
        if (service.serviceTypeId === 2) {
          setRideshare(true);
          rideshareCost = service.cost;
          return rideshareCost;
        } else if (service.serviceTypeId === 3) {
          setParking(true);
          parkingCost = service.cost;
          return parkingCost;
        }
      });
    }
  };

  React.useEffect(() => {
    if (details.services !== null) {
      hasServices(details);
      details.rideshareCost = rideshareCost;
      details.parkingCost = parkingCost;
    }
  });

  return (
    <Fragment>
      <div className="feature-box bg-slick-carbon py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6} className="d-flex align-items-center">
              <Card className="card-box flex-fill mb-4 mb-xl-0 img-wrapper img-wrapper-dark">
                <img
                  alt="..."
                  className="align-items-center"
                  height={400}
                  width={600}
                  src={details.event.imageUrl}
                />
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className="py-0 py-xl-5">
                <div className="pl-0 pl-xl-5 text-white">
                  <h1 className="display-3 mb-3 font-weight-bold">
                    {details.title}
                  </h1>
                  <p className="font-size-xl text-white-50">
                    {details.shortDescription}
                  </p>
                  <div className="d-block mt-4">
                    <Slider
                      slidesToShow={2}
                      slidesToScroll={2}
                      dots={true}
                      className="slick-slider slick-slider-left"
                    ></Slider>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="feature-box py-5">
        <Container className="py-5">
          <Grid item xl={7} md={9} className="px-0">
            <h1 className="display-3 mb-3 font-weight-bold">What to expect:</h1>
            <p className="font-size-lg text-black-50">{details.description}</p>
          </Grid>
          <Grid container spacing={4}>
            <Grid item md={6} xl={4}>
              <div className="py-2 py-xl-5">
                <div className="d-block pl-0 pl-xl-3 mt-4">
                  <div className="feature-box mb-4 pr-4">
                    <h3 className="font-size-lg font-weight-bold my-3">
                      Main Event Details: {details.event.name}
                    </h3>
                    <p className="text-black-50 mb-3">
                      {details.event.shortDescription}
                    </p>
                    <p className="text-black-50 mb-3">
                      {dateService.formatDateTime(details.event.dateStart)} to{" "}
                      {dateService.formatDateTime(details.event.dateEnd)}
                    </p>
                  </div>
                  <div className="feature-box mb-4 pr-4">
                    <h3 className="font-size-lg font-weight-bold my-3">
                      Service Type:
                    </h3>
                    <p className="text-black-50 mb-3">
                      {details.serviceType.name}
                    </p>
                  </div>
                  <div className="feature-box pr-4">
                    <h3 className="font-size-lg font-weight-bold my-3">
                      Additional Details:
                    </h3>
                    <p className="text-black-50 mb-3">
                      {details.serviceType.id === 1 ? (
                        <div>
                          <FontAwesomeIcon
                            icon={["fas", "users"]}
                            className="text-primary font-size-lg mr-2"
                          />
                          Guest Capacity: {details.listingProfile.GuestCapacity}
                        </div>
                      ) : (
                        `- License Status: ${details.listingProfile.LicenseStatus}`
                      )}
                    </p>
                    <p className="text-black-50 mb-3">
                      {details.serviceType.id === 1 ? (
                        <div>
                          <FontAwesomeIcon
                            icon={["fas", "home"]}
                            className="text-primary font-size-lg mr-2"
                          />
                          Bedrooms: {details.listingProfile.Bedrooms}
                        </div>
                      ) : (
                        `- Insurance Status: ${details.listingProfile.LicenseStatus}`
                      )}
                    </p>
                    <p className="text-black-50 mb-3">
                      {details.serviceType.id === 1 ? (
                        <div>
                          <FontAwesomeIcon
                            icon={["fas", "shower"]}
                            className="text-primary font-size-lg mr-2"
                          />
                          Baths : {details.listingProfile.Baths}
                        </div>
                      ) : (
                        ``
                      )}
                    </p>
                  </div>
                  {details.services && (
                    <div className="feature-box pr-4">
                      <h3 className="font-size-lg font-weight-bold my-3">
                        Additional Services:
                      </h3>
                      {rideshare && (
                        <p className="text-black-50 mb-3">
                          <div>
                            <FontAwesomeIcon
                              icon={["fas", "car"]}
                              className="text-primary font-size-lg mr-2"
                            />
                            Rideshare
                          </div>
                        </p>
                      )}
                      {parking && (
                        <p className="text-black-50 mb-3">
                          <div>
                            <FontAwesomeIcon
                              icon={["fas", "car"]}
                              className="text-primary font-size-lg mr-2"
                            />
                            Parking
                          </div>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xl={8}
              className="d-flex pt-5 pt-xl-0 align-items-start align-items-xl-center"
            >
              <ListingReservation listing={details} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

ShowListingDetails.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    event: PropTypes.shape({
      name: PropTypes.string.isRequired,
      dateStart: PropTypes.string.isRequired,
      dateEnd: PropTypes.string.isRequired,
      shortDescription: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
    serviceType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    listingProfile: PropTypes.shape({
      Baths: PropTypes.number,
      Bedrooms: PropTypes.number,
      GuestCapacity: PropTypes.number,
      CostPerNight: PropTypes.number,
      LicenseStatus: PropTypes.number,
      InsuranceStatus: PropTypes.number,
    }),
    services: PropTypes.arrayOf(
      PropTypes.shape({
        cost: PropTypes.number,
        serviceProfileId: PropTypes.number,
        serviceTypeId: PropTypes.number,
      })
    ),
    parkingCost: PropTypes.number,
    rideshareCost: PropTypes.number,
  }),
};

export default ShowListingDetails;
