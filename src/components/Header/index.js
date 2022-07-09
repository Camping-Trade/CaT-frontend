import React from 'react';
import {StyledLink, StyledAtag} from "../../styles/StyledLink";
import {HeaderWrapper} from "./style";
import CaT from "../../assets/CaT.png";

const Header = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
      <HeaderWrapper>
        <StyledLink to="/">
          <img src={CaT} alt="로고" title="CaT"/>  {/*로고 디자인 변경 예정*/}
        </StyledLink>
        <StyledAtag href={KAKAO_AUTH_URL}>
          로그인
        </StyledAtag>
      </HeaderWrapper>
  )
}

export default Header;