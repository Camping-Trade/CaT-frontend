import React from "react";
import {ContentWrapper, MainImg, Wrapper} from "./style";
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
          <p>{campsite.facltNm}</p>
          <span>{campsite.induty}</span>
          <span>{campsite.lineIntro}</span>
          <span>{address}</span>
        </ContentWrapper>
      </Wrapper>
  )
}

export default OneCampsiteOnList;