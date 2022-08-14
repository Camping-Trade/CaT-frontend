import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
// Components
import Header from "../../components/Header";
import {SpotBasedSearch} from "../../components/GoCampingAPI/index";
import {KakaoMapAPI, KakaoSpotBasedSearch} from "../../components/Map";
import AreacodeAPI from "../../components/AreacodeAPI";
import OneCampsiteOnList from "../../components/OneCampsiteOnList";
import Footer from "../../components/Footer";
// Style
import {
  BottomWrapper,
  DefaultInform,
  MapWrapper,
  ResultWrapper, SearchBtn,
  SearchInputWrapper, Select,
  TopWrapper,
  Wrapper
} from "./style";
import { FaSistrix } from 'react-icons/fa';


const AllCampsite = () => {

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
  const [numOfRows, setNumOfRows] = useState(15);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // 페이지네이션
  // const [pages, setPages] = useState([1]);
  // const [totalPageCount, setTotalPageCount] = useState(0);

  // 카카오맵 불러오기
  // useEffect(() => {
  //   // KakaoMapAPI();
  // },[]);

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

  // 페이지네이션
  // useEffect(() => {
  //   let totalPage = parseInt(totalCount / numOfRows);
  //   if(totalCount % numOfRows !== 0) totalPage += 1;
  //   // console.log("totalPage: ", totalPage)
  //   setTotalPageCount(totalPage);
  // },[pageNo, totalCount]);


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

  // 검색
  const onClickSearch = async () => {
    // 주소 -> 좌표 변환
    await axios
        .get('https://dapi.kakao.com//v2/local/search/address.json',{
          params: {
            'query': `${selectedLocalText1 + " " + selectedLocalText2}`
          },
          headers: {
            'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
          }
        })
        .then((res) => {
          console.log("👍주소->좌표 변환 호출 성공", res.data);
          const x = res.data.documents[0].x;
          const y = res.data.documents[0].y;

          callGoCamping(x, y)
              .then((res) => {
                console.log("고캠핑 검색 결과: ", res);
                setCampsiteList(res[0]);
                setNumOfRows(res[1].value);
                // setPageNo(res[2].value);
                setTotalCount(res[2].value);
              })
              .catch((err) => {
                console.log(err);
              })
        })
        .catch((err) => {
          console.log("🧨주소->좌표 변환 호출 실패", err);
        })
  };

  async function callGoCamping(x, y) {
    return await SpotBasedSearch(x, y);
  }


  // 고캠핑 검색 결과 리스트 나타내기
  const CampsiteList = campsiteList.map((campsite) => {
    if(!campsiteList) return (<div>캠핑장을 검색하세요!</div>)
    return <OneCampsiteOnList data={campsite.children}/>
  });


  return (
      <div>
        <Header/>
        <Wrapper>
          <TopWrapper>
            {/*<MapWrapper id="kakao-map"/>*/}
            <SearchInputWrapper>
              <Select onChange={SelectLocal1} value={selectedLocal1}>
                <option value="" disabled defaultValue>-- 지역1 --</option>
                {area1Items.map((item) => {
                  const rnum = item.children[0].value;
                  const code = item.children[1].value;
                  const name = item.children[2].value;
                  return <option key={rnum} value={code}>{name}</option>
                })}
              </Select>
              <Select onChange={SelectLocal2} value={selectedLocal2}>
                <option value="" disabled defaultValue>-- 지역2 --</option>
                {area2Items.map((item) => {
                  const rnum = item.children[0].value;
                  const code = item.children[1].value;
                  const name = item.children[2].value;
                  return <option key={rnum} value={code}>{name}</option>
                })}
              </Select>
              {/*<input />*/}
              <SearchBtn onClick={onClickSearch}>
                <FaSistrix />
              </SearchBtn>
            </SearchInputWrapper>
          </TopWrapper>
          <BottomWrapper>
            <ResultWrapper>
              {campsiteList.length === 0
                  ? (<DefaultInform>🏕 캠핑장을 검색하세요! 🏕</DefaultInform>)
                  : CampsiteList}
            </ResultWrapper>
          </BottomWrapper>
        </Wrapper>
        <Footer />
      </div>
  )
}

export default AllCampsite;