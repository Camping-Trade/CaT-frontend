import React, {useEffect} from "react";
import {Wrapper} from "./style";

const {kakao} = window;

const KakaoMapAPI = () => {
  const container = document.getElementById('kakao-map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };
  const map = new kakao.maps.Map(container, options);
}

const MapContainer = () => {
  useEffect(() => {
    KakaoMapAPI();
  },[]);

  return (
      <Wrapper id="kakao-map">

      </Wrapper>
  )
}

export default MapContainer;