import React from 'react';
import StyledLink from "../../styles/StyledLink";
import {HeaderWrapper} from "./style";
import CaT from "../../assets/CaT.png";

const Header = () => {
  return (
      <HeaderWrapper>
        <StyledLink to="/">
          <img src={CaT} alt="로고" title="CaT"/>  {/*로고 디자인 변경 예정*/}
        </StyledLink>
        <StyledLink to="/login">로그인</StyledLink>
      </HeaderWrapper>
  )
}

export default Header;