import React from "react";
import PropTypes from "prop-types";
import ViewListingDetails from "../components/listings/ViewListingDetails";

const ListingDetails = (props) => {
  const listingDetails = props.location.state.payload;

  return listingDetails ? (
    <ViewListingDetails details={listingDetails}></ViewListingDetails>
  ) : (
    <h1>{"Loading details..."}</h1>
  );
};

ListingDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      payload: PropTypes.shape({
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
        type: PropTypes.string,
      }),
    }),
  }),
};

export default ListingDetails;
