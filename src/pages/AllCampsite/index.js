import React from "react";
import Header from "../../components/Header";
import {SearchInputWrapper, SearchWrapper} from "./style";
import MapContainer from "../../components/MapContainer";

const AllCampsite = () => {

  return (
      <div>
        <Header/>
        <SearchWrapper>
          <MapContainer />
          <SearchInputWrapper>

          </SearchInputWrapper>
        </SearchWrapper>
      </div>
  )
}

export default AllCampsite;