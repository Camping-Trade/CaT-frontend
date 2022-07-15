import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import {KakaoMapAPI, KakaoSpotBasedSearch} from "../../components/Map";
import {SpotBasedSearch} from "../../components/GoCampingAPI/index";
import {MapWrapper, SearchInputWrapper, SearchWrapper} from "./style";


const AllCampsite = () => {
  const [mapX, setMapX] = useState(33.4506810661721);
  const [mapY, setMapY] = useState(126.57049341667);

  useEffect(() => {
    KakaoMapAPI();
    KakaoSpotBasedSearch();
  },[]);



  return (
      <div>
        <Header/>
        <SearchWrapper>
          <MapWrapper id="kakao-map"/>
          <SearchInputWrapper>
            <SpotBasedSearch x={mapX} y={mapY}/>
          </SearchInputWrapper>
        </SearchWrapper>
      </div>
  )
}

export default AllCampsite;