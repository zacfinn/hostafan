import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import * as listingService from "../services/listingService";
import ListingInfo from "../components/listings/ListingInfo";
import { useHistory } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../services/serviceHelpers";
//Proprietary code removed

const _logger = logger.extend("listings");
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "750px",
};
const mapOptions = {
  maxZoom: 12,
  streetViewControl: false,
};

const SearchLanding = (props) => {
  const [listings, setListings] = useState();
  const [mapData, setMapData] = useState({
    center: { lat: 100, lng: -100 },
    zoom: 12,
  });
  const [markers, setMarkers] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!props.location.state) {
      history.push("/home");
    } else {
      let center = props.location.state.payload;
      let lat = center.lat;
      let lng = center.lng;
      setMapData({ center: center, zoom: 12 });
      listingService
        .searchListingsByLocation(0, 20, lat, lng, 50)
        .then(onGetListingsSuccess)
        .catch(onGetListingsError);
    }
  }, []);

  const mapListing = (listing) => {
    return (
      <ListingInfo key={listing.id} listing={listing} viewMore={viewMore} />
    );
  };

  const mapMarker = (listing) => {
    const location = {
      lat: listing.location.latitude,
      lng: listing.location.longitude,
    };
    return <Marker key={listing.id} position={location}></Marker>;
  };

  const viewMore = (listing) => {
    _logger(listing);
    props.history.push(`/ListingDetails/${listing.id}`, {
      type: "LISTING_DATA",
      payload: listing,
    });
  };

  const onGetListingsSuccess = (res) => {
    setListings(res.item.pagedItems.map(mapListing));
    setMarkers(res.item.pagedItems.map(mapMarker));
  };
  const onGetListingsError = (err) => _logger(err);
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          {listings ? listings : <div>Loading...</div>}
        </Grid>
        <Grid
          item
          className="mt-2"
          xs={6}
          display={{ xs: "none", sm: "block" }}
        >
          <LoadScript
            id="script-loader"
            googleMapsApiKey={GOOGLE_API_KEY}
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapData.center}
              zoom={mapData.zoom}
              options={mapOptions}
            >
              {markers}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </Fragment>
  );
};

SearchLanding.propTypes = {
//Proprietary code removed
};

export default SearchLanding;
