import React, {useCallback, useEffect, useState} from "react";
import Header from "../../components/Header";
import {SpotBasedSearch} from "../../components/GoCampingAPI/index";
import {MapWrapper, ResultWrapper, SearchInputWrapper, Wrapper} from "./style";
import {KakaoMapAPI, KakaoSpotBasedSearch} from "../../components/Map";
import AreacodeAPI from "../../components/AreacodeAPI";


const AllCampsite = () => {

  const [mapX, setMapX] = useState(33.4506810661721);
  const [mapY, setMapY] = useState(126.57049341667);

  // 카카오맵 불러오기
  useEffect(() => {
    KakaoMapAPI();
    AreacodeAPI();
  },[]);



  async function callSpotBasedSearch() {
    return await KakaoSpotBasedSearch();
  }

  // SpotBasedSearch({mapX, mapY});
  callSpotBasedSearch()
      .then((res) => {
        setMapX(res[0]);
        setMapY(res[1]);
      })
      .catch((err) => {
        console.log(err);
      })

  const onClickSearch = useCallback(() => {
    SpotBasedSearch(mapX, mapY);
  },[mapX, mapY])


  return (
      <div>
        <Header/>
        <Wrapper>
          <MapWrapper id="kakao-map"/>
          <SearchInputWrapper>
            <select>

            </select>
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