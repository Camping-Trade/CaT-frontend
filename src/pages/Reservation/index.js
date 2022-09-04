import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {KakaoMapMarker} from "../../components/PublicAPI/MapAPI";
import {PageWrapper} from "../../styles/PageLayout";
import {
  CalendarWrapper,
  Info,
  InfoWrapper, Input,
  LeftWrapper,
  MainImg,
  Map,
  Name,
  OneInfo, SubmitBtn,
  RightWrapper,
  SelectDateWrapper, PointWrapper, Warning
} from "./style";
import {StyledAtag} from "../../styles/StyledLink";
import Color from "../../styles/Color";
import GetUserData from "../../components/GetUserData";
import {useCookies} from "react-cookie";
import useInput from "../../hooks/useInput";


const Reservation = () => {
  const params = useParams();
  const location = useLocation();
  // console.log(params, location);

  // 캠핑장 정보
  const Campsite = location.state.data.campsite;
  console.log(Campsite);

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  // 유저 포인트
  const [userPoint, setUserPoint] = useState(0);
  // 날짜 input
  const [startDate, onChangeStartDate, setStartDate] = useInput("");
  const [endDate, onChangeEndDate, setEndDate] = useInput("");
  // 인원 input
  const [people, onChangePeople, setPeople] = useInput();
  // 포인트 사용 input
  const [usePoint, setUsePoint] = useState();
  // 포인트 사용 warning
  const [warning, setWarning] = useState("");


  // 유저 정보 받아오기
  useEffect(() => {
    cookies.appToken && GetUserData(cookies.appToken)
        .then((res) => {
          console.log("👍유저데이터 프로미스 반환", res);
          setUserPoint(res.point);
        })
        .catch((err) => console.log("🧨유저데이터 프로미스 반환 에러", err))
  },[cookies.appToken]);

  // 카카오맵 불러오기
  useEffect(() => {
    KakaoMapMarker(Campsite.mapY, Campsite.mapX, Campsite.facltNm);
  },[Campsite.mapY, Campsite.mapX, Campsite.facltNm]);


  const onChangeUsePoint = (e) => {
    const value = e.target.value;
    // console.log("input: ", value);
    if(value > userPoint) {
      setWarning("block");
    }
    else setWarning("");
    setUsePoint(value);
  }


  // 캠핑장 디테일로 이동
  const onClickDetail = () => {
    navigate(`/campsites/${Campsite.contentId}`, {
      state: {
        data: location.state.data
      }
    })
  }

  return (
      <div>
        <Header />
        <PageWrapper flexDirection="row" alignItems="flex-start">

          {/* 지도 및 정보 */}
          <LeftWrapper>
            {/* 사진과 정보 */}
            <InfoWrapper>
              <MainImg src={Campsite.firstImageUrl} alt="대표이미지" />
              <Info>
                <OneInfo>
                  <span>홈페이지 | </span>
                  <StyledAtag
                      color="gray"
                      hover={Color.pointcolor}
                      href={Campsite.homepage}>
                    바로가기
                  </StyledAtag>
                </OneInfo>
                <OneInfo>
                  <span>홈페이지에서 예약 | </span>
                  <StyledAtag
                      color="gray"
                      hover={Color.pointcolor}
                      href={Campsite.resveUrl}>
                    바로가기
                  </StyledAtag>
                </OneInfo>
                <OneInfo>
                  <span>tel | </span>
                  <span>{Campsite.tel}</span>
                </OneInfo>
                <OneInfo>
                  <span>주소 | </span>
                  <span>{Campsite.addr1}</span>
                </OneInfo>
              </Info>
            </InfoWrapper>
            {/* 지도 */}
            <Map id="kakao-map" />
          </LeftWrapper>


          {/*/!*백으로 응답보내기*!/*/}
          {/*{Campsite.mapX} {Campsite.mapY} /!* 위치좌표 *!/*/}
          {/*<div>{Campsite.hvofBgnde}</div> /!* 휴일시작 *!/*/}
          {/*<div>{Campsite.hvofEnddle}</div> /!* 휴일끝 *!/*/}


          {/* 예약 정보 */}
          <RightWrapper>
            {/* 캠핑장 이름 */}
            <Name onClick={onClickDetail}>{Campsite.facltNm}</Name>

            {/* */}
            <SelectDateWrapper>
              <CalendarWrapper>달력</CalendarWrapper>
              <div>
                <div>
                  <p>날짜</p>
                  <Input
                      type="date"
                      value={startDate}
                      onChange={onChangeStartDate}
                  />
                  &nbsp;~&nbsp;
                  <Input
                      type="date"
                      value={endDate}
                      onChange={onChangeEndDate}
                  />
                </div>
                {/* 인원 선택 */}
                <div>
                  <p>인원</p>
                  <Input
                      type="number"
                      placeholder="0"
                      value={people}
                      onChange={onChangePeople}
                      min="0"
                  />
                  <span>&nbsp;명</span>
                </div>
              </div>
            </SelectDateWrapper>

            {/* 포인트 */}
            <PointWrapper>
              <p>포인트 사용하기</p>
              <Input
                  type="number"
                  placeholder={userPoint}
                  value={usePoint}
                  onChange={onChangeUsePoint}
                  min="0"
              />
              <span>&nbsp;점</span>
              <span>&nbsp;(사용가능 포인트:</span>
              <span>&nbsp;{userPoint}점)</span>
              <Warning display={warning}>잔여 포인트 이상 사용할 수 없습니다.</Warning>
            </PointWrapper>

            <SubmitBtn>예약하기</SubmitBtn>

          </RightWrapper>
        </PageWrapper>
        <Footer />
      </div>
  )
}

export default Reservation;