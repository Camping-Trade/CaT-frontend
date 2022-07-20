import React, {useCallback, useEffect, useState} from "react";
import Header from "../../components/Header";
import {SpotBasedSearch} from "../../components/GoCampingAPI/index";
import {MapWrapper, ResultWrapper, SearchInputWrapper, Wrapper} from "./style";
import {KakaoMapAPI, KakaoSpotBasedSearch} from "../../components/Map";


const AllCampsite = () => {

  const [mapX, setMapX] = useState(33.4506810661721);
  const [mapY, setMapY] = useState(126.57049341667);

  // 카카오맵 불러오기
  useEffect(() => {
    KakaoMapAPI();
  },[]);



  async function callSpotBasedSearch() {
    const loc = await KakaoSpotBasedSearch();
    console.log("tmpX, tmpY: ", loc);
    return loc;
  }

  // SpotBasedSearch({mapX, mapY});
  callSpotBasedSearch()
      .then((res) => {
        console.log("promise res: ", res[0], res[1]);
        setMapX(res[0]);
        setMapY(res[1]);
      })
      .catch((err) => {
        console.log(err);
      })
  console.log("onclick: ", mapX, mapY);

  const onClickSearch = useCallback(() => {
    SpotBasedSearch(mapX, mapY);
  },[mapX, mapY])


  return (
      <div>
        <Header/>
        <Wrapper>
          <MapWrapper id="kakao-map"/>
          <SearchInputWrapper>
            <input />
            <input />
            <input />
            <button onClick={onClickSearch}>입력</button>
          </SearchInputWrapper>
          <ResultWrapper>
            결과
          </ResultWrapper>
        </Wrapper>
      </div>
  )
}

export default AllCampsite;