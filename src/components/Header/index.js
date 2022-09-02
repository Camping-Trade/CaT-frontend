import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import HeaderModal from "../HeaderModal";
import GetUserData from "../GetUserData";
import {StyledLink, StyledAtag} from "../../styles/StyledLink";
import CaT from "../../assets/CaT.png";
import {HeaderWrapper, ProfileImg} from "./style";


const Header = () => {

  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);
  const [showModal, setShowModal] = useState(false);
  // 유저데이터
  const [userData, setUserData] = useState({});

  // 로그인한 사용자가 있을시 유저데이터 받아오기(최초 1번)
  useEffect(() => {
    cookies.appToken && GetUserData(cookies.appToken)
        .then((res) => {
          console.log("👍유저데이터 프로미스 반환", res);
          setUserData(res);
        })
        .catch((err) => console.log("🧨유저데이터 프로미스 반환 에러", err))
  },[cookies.appToken]);


  return (
      <HeaderWrapper>
        <StyledLink to="/">
          <img src={CaT} alt="로고" title="CaT" style={{width: "70px"}}/>
        </StyledLink>
        {cookies.appToken
            ?
            <>
              <ProfileImg
                  src={userData.thumbnail_image_url}
                  alt="프로필 이미지"
                  onClick={() => setShowModal(prev => !prev)}/>
              <HeaderModal show={showModal} />
            </>
            :
            <StyledAtag href={KAKAO_AUTH_URL}>
              로그인
            </StyledAtag>}

      </HeaderWrapper>
  )
}

export default Header;