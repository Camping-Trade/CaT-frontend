import React, {useCallback, useEffect, useState} from "react";
import useInput from "../../hooks/useInput";
// Components
import Header from "../../components/Header";
import {SpotBasedSearch} from "../../components/GoCampingAPI/index";
import {KakaoMapAPI, KakaoSpotBasedSearch} from "../../components/Map";
import AreacodeAPI from "../../components/AreacodeAPI";
import OneCampsiteOnList from "../../components/OneCampsiteOnList";
// Style
import {BottomWrapper, MapWrapper, ResultWrapper, SearchInputWrapper, TopWrapper, Wrapper} from "./style";


const AllCampsite = () => {

  // 검색 좌표
  const [mapX, setMapX] = useState(128.6142847);
  const [mapY, setMapY] = useState(36.0345423);
  // 지역코드
  const [areaCode, setAreaCode] = useState(null);
  const [selectedLocal1, setSelectedLocal1] = useState("");
  const [selectedLocal2, setSelectedLocal2] = useState("");
  // 지역명
  const [selectedLocalText1, setSelectedLocalText1] = useState("");
  const [selectedLocalText2, setSelectedLocalText2] = useState("");
  // 지역코드1로 조회한 지역 결과 리스트
  const [area1Items, setArea1Items] = useState([]);
  // 지역코드2로 조회한 지역 결과 리스트
  const [area2Items, setArea2Items] = useState([]);
  // 고캠핑 검색 결과
  const [campsiteList, setCampsiteList] = useState([]);

  // 카카오맵 불러오기
  useEffect(() => {
    KakaoMapAPI();
  },[]);

  // 지역 코드1 불러오기
  useEffect(() => {
    AreacodeAPI(null)
        .then((res) => {
          setArea1Items(res);
        })
        .catch((err) => {
          console.log(err);
        })
  },[]);

  // 지역 코드2 불러오기
  useEffect(() => {
    if(areaCode === '8') {
      setArea2Items([]);
      return;
    }
    AreacodeAPI(areaCode)
        .then((res) => {
          setArea2Items(res);
        })
        .catch((err) => {
          console.log(err);
        })
  },[areaCode]);


  async function callSpotBasedSearch() {
    return await KakaoSpotBasedSearch(selectedLocalText1 + " " + selectedLocalText2);
  }

  callSpotBasedSearch()
      .then((res) => {
        setMapX(res[0]);
        setMapY(res[1]);
      })
      .catch((err) => {
        console.log(err);
      })

  // 지역1 선택
  const SelectLocal1 = (e) => {
    // console.log(e.target.options[e.target.selectedIndex].text);
    const text = e.target.options[e.target.selectedIndex].text;
    setSelectedLocal1(e.target.value);
    setSelectedLocalText1(text);
    setAreaCode(e.target.value);
    setSelectedLocal2("");
  };

  // 지역2 선택
  const SelectLocal2 = (e) => {
    // console.log(e.target.options[e.target.selectedIndex].text);
    const text = e.target.options[e.target.selectedIndex].text;
    setSelectedLocal2(e.target.value);
    setSelectedLocalText2(text);
  };

  const onClickSearch = async () => {
    const data = await SpotBasedSearch(mapX, mapY);
    console.log("고캠핑 검색 결과: ", data);
    setCampsiteList(data);
  };


  // 고캠핑 검색 결과 리스트 나타내기
  const CampsiteList = campsiteList.map((campsite) => {
    return <OneCampsiteOnList campsite={campsite}/>
  });


  return (
      <div>
        <Header/>
        <Wrapper>
          <TopWrapper>
            <MapWrapper id="kakao-map"/>
            <SearchInputWrapper>
              <select onChange={SelectLocal1} value={selectedLocal1}>
                <option value="">--지역1--</option>
                {area1Items.map((item) => {
                  return <option key={item.rnum} value={item.code}>{item.name}</option>
                })}
              </select>
              <select onChange={SelectLocal2} value={selectedLocal2}>
                <option value="">--지역2--</option>
                {area2Items.map((item) => {
                  return <option key={item.rnum} value={item.code}>{item.name}</option>
                })}
              </select>
              <input />
              <button onClick={onClickSearch}>입력</button>
            </SearchInputWrapper>
          </TopWrapper>
          <BottomWrapper>
            <ResultWrapper>
              {CampsiteList}
            </ResultWrapper>
          </BottomWrapper>
        </Wrapper>
      </div>
  )
}

export default AllCampsite;