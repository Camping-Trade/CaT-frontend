import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import preURL from "../../preURL";
//
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GetUserData from "../../components/GetUserData";
//
import {PageWrapper} from "../../styles/PageLayout";
import {InfoWrapper, ProfileImg, LeftWrapper, RightWrapper, PointTitle, UserPoint} from "./style";



const MyPage = () => {

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  // 유저 정보
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [userPoint, setUserPoint] = useState(Number);


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
        })
        .catch((err) => {
          console.log('🧨유저 예약 정보 받아오기 실패', err);
        })
  },[cookies.appToken]);


  return (
      <div>
        <Header />
        <PageWrapper flexDirection="row" alignItems="flex-start">

          {/* 유저 정보 */}
          <LeftWrapper>
            <ProfileImg src={profileImg} alt="프로필 이미지" />
            <InfoWrapper>
              <p>{nickname}</p>
              <p>{email}</p>
            </InfoWrapper>
          </LeftWrapper>

          {/* 내역 정보 */}
          <RightWrapper>
            <PointTitle>나의 Point</PointTitle>
            <UserPoint>{userPoint}</UserPoint>
            <div>

            </div>
          </RightWrapper>

        </PageWrapper>
        <Footer />
      </div>
  )
}

export default MyPage;