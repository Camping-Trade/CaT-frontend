import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
// import preURL from "../../preURL";
//
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GetUserData from "../../components/GetUserData";
//
import {PageWrapper} from "../../styles/PageLayout";
import {
  InfoWrapper,
  ProfileImg,
  LeftWrapper,
  RightWrapper,
  PointTitle,
  UserPoint,
  RecordWrapper,
  Record, PointWrapper, OneReserv, OneTrade, OneTradeInfo, TradeType
} from "./style";



const MyPage = () => {

  const preURL = process.env.REACT_APP_PREURL;

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  // 유저 정보
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [userPoint, setUserPoint] = useState(Number);

  // 예약 내역
  const [reservList, setReservList] = useState([]);

  // 나눔 내역
  const [tradeList, setTradeList] = useState([
    {type: '나눔하기', date: '2022.09.01', camping: 'oo캠핑장', price: 5000},
    {type: '나눔받기', date: '2022.09.05', camping: 'xx캠핑장', price: 4000}
  ]);


  // 유저 정보 받아오기
  useEffect(() => {
    cookies.appToken && GetUserData(cookies.appToken)
        .then((res) => {
          console.log("👍유저데이터 프로미스 반환", res);
          setNickname(res.nickname);
          setEmail(res.email);
          setProfileImg(res.profile_image_url);
          setUserPoint(res.point);
        })
        .catch((err) => console.log("🧨유저데이터 프로미스 반환 에러", err))
  },[cookies.appToken]);


  // 예약 정보 받아오기
  useEffect(() => {
    axios
        .get(preURL + '/member/reservations',{
          headers: {
            'Authorization': `Bearer ${cookies.appToken}`
          }
        })
        .then((res) => {
          console.log('👍유저 예약 정보 받아오기 성공', res);
          setReservList(res.data);
        })
        .catch((err) => {
          console.log('🧨유저 예약 정보 받아오기 실패', err);
        })
  },[cookies.appToken]);


  // 나눔 내역
  const Trades = tradeList.map((trade, index) => {
    return (
        <OneTrade key={index}>
          <OneTradeInfo>
            <TradeType>{trade.type}</TradeType>
            <span>{trade.date}&nbsp;&nbsp;</span>
            <span>{trade.camping}</span>
          </OneTradeInfo>
          <span>{`+${trade.price}`}</span>
        </OneTrade>
    )
  });

  // 예약 내역
  const Reservation = reservList.map((reserv, index) => {
    return (
        <OneReserv key={index}>
          <span>{reserv.campingName}</span>
          <span>예약 일자: {reserv.reservationDate}</span>
          <span>예약 기간: {reserv.campingDateStart} ~ {reserv.campingDateEnd}</span>
          <span>인원수: {reserv.numberOfPeople}</span>
          <span>사용 포인트: {reserv.usingPoint}</span>
        </OneReserv>
    )
  });


  return (
      <div>
        <Header />
        <PageWrapper
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between"
        >

          {/* 유저 정보 */}
          <LeftWrapper>
            <ProfileImg src={profileImg} alt="프로필 이미지" />
            <InfoWrapper>
              <p>닉네임 | {nickname}</p>
              <p>이메일 | {email}</p>
            </InfoWrapper>
          </LeftWrapper>

          {/* 내역 정보 */}
          <RightWrapper>
            <PointWrapper>
              <PointTitle>나의 Point</PointTitle>
              <UserPoint>{userPoint}</UserPoint>
            </PointWrapper>

            <RecordWrapper>
              {/* 나눔 내역 */}
              <Record>
                <p>나눔 내역</p>
                {Trades}
              </Record>

              {/* 예약 내역 */}
              <Record>
                <p>예약 내역</p>
                {Reservation}
              </Record>

            </RecordWrapper>
          </RightWrapper>

        </PageWrapper>
        <Footer />
      </div>
  )
}

export default MyPage;