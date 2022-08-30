import React, {useEffect, useState} from "react";
import axios from "axios";
// Components
import Header from "../../components/Header";
import {SpotBasedSearch} from "../../components/API/GoCampingAPI/index";
import AreacodeAPI from "../../components/API/AreacodeAPI";
import OneCampsiteOnList from "../../components/OneCampsiteOnList";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
// Style
import {
  BottomWrapper,
  DefaultInform,
  ResultWrapper, SearchBtn,
  SearchInputWrapper, Select,
  TopWrapper,
} from "./style";
import { FaSistrix } from 'react-icons/fa';
import {PageWrapper} from "../../styles/PageLayout";


const AllCampsite = () => {

  // 지역코드
  const [areaCode, setAreaCode] = useState(null);
  const [selectedLocal1, setSelectedLocal1] = useState("");
  const [selectedLocal2, setSelectedLocal2] = useState("");
  // 지역명
  const [selectedLocalText1, setSelectedLocalText1] = useState("");
  const [selectedLocalText2, setSelectedLocalText2] = useState("");
  // 지역명에 해당하는 x, y 좌표
  const [coordX, setCoordX] = useState(0);
  const [cooredY, setCoordY] = useState(0);
  // 지역코드1로 조회한 지역 결과 리스트
  const [area1Items, setArea1Items] = useState([]);
  // 지역코드2로 조회한 지역 결과 리스트
  const [area2Items, setArea2Items] = useState([]);
  // 고캠핑 검색 결과
  const [campsiteList, setCampsiteList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  // 페이지네이션
  const [pages, setPages] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);


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

  // 캠핑장 정보 불러오기
  useEffect(() => {
    if(coordX === 0 && cooredY === 0) return
    callGoCamping(coordX, cooredY, pageNo);
  },[coordX, cooredY, pageNo]);



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
    if(areaCode !== 8 && (!selectedLocalText1 || !selectedLocalText2)) {
      alert('지역을 선택해주세요.');
      return;
    }
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
          setCoordX(x);
          setCoordY(y);
        })
        .catch((err) => {
          console.log("🧨주소->좌표 변환 호출 실패", err);
        })
  };

  // 고캠핑 데이터 불러오기
  const callGoCamping = async (x, y, pg) => {
    return await SpotBasedSearch(x, y, pg)
        .then((res) => {
          console.log("고캠핑 검색 결과: ", res);
          setCampsiteList(res[0]);
          // 총 페이지카운트 계산
          let totalCount = res[2].value;
          let numOfRows = res[1].value;
          let totalPage = parseInt(totalCount / numOfRows);
          if(totalCount % numOfRows !== 0) totalPage += 1;
          setTotalPageCount(totalPage);
        })
        .catch((err) => {
          console.log(err);
        })
  };


  // 고캠핑 검색 결과 리스트 나타내기
  const CampsiteList = campsiteList.map((campsite) => {
    return <OneCampsiteOnList data={campsite.children}/>
  });


  return (
      <div>
        <Header/>
        <PageWrapper>
          <TopWrapper>
            {/*<MapWrapper id="kakao-map"/>*/}

            {/* 검색 */}
            <SearchInputWrapper>
              <Select onChange={SelectLocal1} value={selectedLocal1}>
                <option value="" disabled defaultValue>-- 도 --</option>
                {area1Items.map((item) => {
                  const rnum = item.children[0].value;
                  const code = item.children[1].value;
                  const name = item.children[2].value;
                  return <option key={rnum} value={code}>{name}</option>
                })}
              </Select>
              <Select onChange={SelectLocal2} value={selectedLocal2}>
                <option value="" disabled defaultValue>-- 시군구 --</option>
                {area2Items.map((item) => {
                  const rnum = item.children[0].value;
                  const code = item.children[1].value;
                  const name = item.children[2].value;
                  return <option key={rnum} value={code}>{name}</option>
                })}
              </Select>
              {/*<input />*/}
              <SearchBtn title="검색" onClick={onClickSearch}>
                <FaSistrix />
              </SearchBtn>
            </SearchInputWrapper>
          </TopWrapper>

          {/* 검색 결과 */}
          <BottomWrapper>
            <ResultWrapper>
              {campsiteList.length === 0
                  ?
                  <DefaultInform>🏕 캠핑장을 검색하세요! 🏕</DefaultInform>
                  :
                  CampsiteList
              }
            </ResultWrapper>
            {totalPageCount !== 0 &&
                <Pagination pages={pages} setPages={setPages} totalPageCount={totalPageCount} pageNo={pageNo} setPageNo={setPageNo}/>
            }
          </BottomWrapper>
        </PageWrapper>
        <Footer />
      </div>
  )
}

export default AllCampsite;