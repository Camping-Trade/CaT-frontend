import React from "react";
import {Address, Content, ContentWrapper, Induty, Intro, MainImg, Name, ReservBtn, Wrapper} from "./style";
// Assets
import Logo from "../../assets/CaT.png";

const OneCampsiteOnList = ({campsite}) => {

  const address = campsite.addr1 + " " + campsite.addr2;

  return (
      <Wrapper>
        {(campsite.firstImageUrl)
            ? <MainImg src={campsite.firstImageUrl} alt="대표이미지"/>
            : <MainImg src={Logo} alt="디폴트 이미지" />
        }
        <ContentWrapper>
          <Content>
            <Name>{campsite.facltNm}</Name>
            <Intro>{campsite.lineIntro}</Intro>
            <Address>{address}</Address>
            <Induty>야영장구분 | {campsite.induty}</Induty>
          </Content>
          <ReservBtn>
            예약하기
          </ReservBtn>
        </ContentWrapper>
      </Wrapper>
  )
}

export default OneCampsiteOnList;