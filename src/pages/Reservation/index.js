import React, {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
// import preURL from "../../preURL";
import useInput from "../../hooks/useInput";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {KakaoMapMarker} from "../../components/PublicAPI/MapAPI";
import GetUserData from "../../components/GetUserData";
import Calendar from "react-calendar";
import "../../styles/Calendar.css";
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
  SelectDateWrapper, PointWrapper, Warning, InputWrapper
} from "./style";
import {StyledAtag} from "../../styles/StyledLink";
import Color from "../../styles/Color";


// month: 영문 <-> 숫자
const Month = {
  "Jan": '01',
  "Feb": '02',
  "Mar": '03',
  "Apr": '04',
  "May": '05',
  "Jun": '06',
  "Jul": '07',
  "Aug": '08',
  "Sep": '09',
  "Oct": '10',
  "Nov": '11',
  "Dec": '12'
}

const Reservation = () => {
  const params = useParams();
  const location = useLocation();
  // console.log(params, location);

  const preURL = process.env.REACT_APP_PREURL;

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

  // 인풋창 Ref
  const dateRef = useRef(null);
  const peopleRef = useRef(null);
  const pointRef = useRef(null);

  // 달력 날짜 선택값
  const [calendar, setCalendar] = useState(String || []);


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

  // 달력 날짜 -> 날짜 인풋 창에 입력으로 변환
  useEffect(() => {
    // console.log(calendar);
    if(!calendar) return
    let start = calendar[0].toString().split(" ");
    let end = calendar[1].toString().split(" ");
    const start_s = start[3] + "-" + Month[start[1]] + "-" + start[2];
    const end_s = end[3] + "-" + Month[end[1]] + "-" + end[2];
    // console.log(start_s, end_s);
    setStartDate(start_s);
    setEndDate(end_s);
  },[calendar]);


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

  // 예약 버튼 클릭
  const onReserv = () => {
    if(!startDate || !endDate || startDate > endDate) {
      alert('날짜를 선택해주세요.');
      dateRef.current.focus();
      return
    }
    else if(!people || people <= 0) {
      alert('인원을 입력해주세요.');
      peopleRef.current.focus();
      return
    }
    else if(usePoint > userPoint) {
      alert('잔여 포인트 이상 사용할 수 없습니다.');
      pointRef.current.focus();
      return
    }

    const reserv = window.confirm('예약하시겠습니까?');
    if(!reserv) return
    axios
        .post(preURL + `/reservation/${Campsite.contentId}`,{
          "campingName" : Campsite.facltNm,
          "locationX" : Number(Campsite.mapX),
          "locationY" : Number(Campsite.mapY),
          "campingDateStart" : startDate.replace(/-/g, '.'),  //
          "campingDateEnd" : endDate.replace(/-/g, '.'),
          "numberOfPeople" : people,
          "usingPoint" : usePoint,
          "price" : 0   // 책정되는 금액 없음
        }, {
          headers: {
            'Authorization': 'Bearer ' + cookies.appToken
          }
        })
        .then((res) => {
          console.log("👍예약 성공", res);
          alert('예약되었습니다!');
        })
        .catch((err) => {
          console.log("🧨예약 실패", err);
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
              <CalendarWrapper>
                <Calendar selectRange="true" value={calendar} onChange={setCalendar}/>
              </CalendarWrapper>
              <InputWrapper>
                <div>
                  <p>날짜</p>
                  <Input
                      type="date"
                      ref={dateRef}
                      value={startDate}
                      onChange={onChangeStartDate}
                      disabled
                  />
                  &nbsp;~&nbsp;
                  <Input
                      type="date"
                      ref={dateRef}
                      value={endDate}
                      onChange={onChangeEndDate}
                      disabled
                  />
                </div>
                {/* 인원 선택 */}
                <div>
                  <p>인원</p>
                  <Input
                      type="number"
                      placeholder="0"
                      ref={peopleRef}
                      value={people}
                      onChange={onChangePeople}
                      min="0"
                  />
                  <span>&nbsp;명</span>
                </div>
              </InputWrapper>
            </SelectDateWrapper>

            {/* 포인트 */}
            <PointWrapper>
              <p>포인트 사용하기</p>
              <Input
                  type="number"
                  placeholder={userPoint}
                  ref={pointRef}
                  value={usePoint}
                  onChange={onChangeUsePoint}
                  min="0"
              />
              <span>&nbsp;점</span>
              <span>&nbsp;(사용가능 포인트:</span>
              <span>&nbsp;{userPoint}점)</span>
              <Warning display={warning}>잔여 포인트 이상 사용할 수 없습니다.</Warning>
            </PointWrapper>

            <SubmitBtn onClick={onReserv}>
              예약하기
            </SubmitBtn>

          </RightWrapper>
        </PageWrapper>
        <Footer />
      </div>
  )
}

export default Reservation;