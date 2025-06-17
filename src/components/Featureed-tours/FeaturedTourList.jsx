import React from "react";
import { Col } from "reactstrap";
import TourCard from "../../shared/TourCard";

import useFetch from "./../../hooks/useFetch.js";
import { BASE_URL } from "./../../utils/config.js";

const FeaturedTourList = () => {
  const {
    data: FeaturedTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`);

  return (
    <>
      {loading && <h4>Loading............</h4>}
      {error && <h4 className="text-danger">{error}</h4>}

      {!loading && !error && FeaturedTours?.length === 0 && (
        <h5>No featured tours found.</h5>
      )}

      {!loading &&
        !error &&
        FeaturedTours?.map((tour) => (
          <Col lg="3" className="mb-3" key={tour._id || tour.id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedTourList;
