import React, { Fragment, useEffect, useState } from "react";
import { Header } from "../layout-components";
import { WrapperSimple, Footer } from "../layout-components";
import {
  Grid,
  Container,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Search, RoomRounded } from "@material-ui/icons";
import ListingCard from "../components/listings/ListingCard";
import * as listingService from "../services/listingService";
//Proprietary code removed
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../services/serviceHelpers";
import Geocode from "react-geocode";

Geocode.setApiKey(GOOGLE_API_KEY);
const libraries = ["places"];
//Proprietary code removed

const Listings = (props) => {
  const [listings, setListings] = useState("Loading events...");
  const [searchValue, setSearchValue] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      listingService
        .getListings(0, 6)
        .then(onGetListingsSuccess)
        .catch(onGetListingsError);
    } else {
      listingService
        .searchListings(0, 6, searchValue)
        .then(onSearchListingsSuccess)
        .catch(onSearchListingsError);
    }
  }, [searchValue]);

  const mapListing = (listing) => {
    return (
      <ListingCard key={listing.id} listing={listing} viewMore={viewMore} />
    );
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchByLocation = () => {
    props.history.push("/searchlanding", {
      type: "GEOCODE_DATA",
      payload: locationSearch,
    });
  };

  const onLoad = (autocomp) => {
    setAutocomplete(autocomp);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      let addressObject = autocomplete.getPlace();
      let address = addressObject.formatted_address;
      Geocode.fromAddress(address).then(onGeocodeSuccess).catch(onGeocodeError);
    }
  };

  const viewMore = (listing) => {
    props.history.push(`/ListingDetails/${listing.id}`, {
      type: "LISTING_DATA",
      payload: listing,
    });
  };

  const onGetListingsSuccess = (response) => {
    _logger(response);
    setListings(response.item.pagedItems.map(mapListing));
  };
  const onGetListingsError = (response) => {
    _logger(response);
  };

  const onSearchListingsSuccess = (response) => {
    _logger(response);
    setListings(response.item.pagedItems.map(mapListing));
  };
  const onSearchListingsError = (err) => {
    _logger(err);
    setListings(
      "No listings could be found for your search. Please check spelling or try different keywords."
    );
  };

  const onGeocodeSuccess = (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    setLocationSearch({ lat, lng });
  };
  const onGeocodeError = () => {
    _logger("Geocode ERROR");
  };

  return (
    <Fragment>
      <Header className="mb-5" />
      <WrapperSimple sectionHeading="Events Near You">
        <Container maxWidth="lg" className="my-4">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                className="app-search-input"
                fullWidth
                value={searchValue}
                onChange={handleSearchChange}
                inputProps={{ "aria-label": "search" }}
                label="Search"
                placeholder="Search by keyword..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="app-search-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <LoadScript
                id="script-loader"
                googleMapsApiKey={GOOGLE_API_KEY}
                libraries={libraries}
              >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <TextField
                    className="app-search-input"
                    fullWidth
                    label="Location Search"
                    placeholder="Search by location..."
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <RoomRounded className="app-map-icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Autocomplete>
              </LoadScript>
            </Grid>
            <Grid item xs={2}>
              <Button
                type="submit"
                className="bg-amy-crisp text-white mt-1"
                variant="contained"
                size="large"
                onClick={searchByLocation}
              >
                Find Events
              </Button>
            </Grid>
          </Grid>
        </Container>
        <Grid container spacing={4}>
          {listings}
        </Grid>
      </WrapperSimple>
      <Footer></Footer>
    </Fragment>
  );
};

Listings.propTypes = {
//Proprietary code removed
};

export default Listings;
