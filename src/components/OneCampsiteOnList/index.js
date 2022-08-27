import React from "react";
import {useNavigate} from "react-router-dom";
// Style
import {Address, Content, ContentWrapper, Induty, Intro, MainImg, Name, ReservBtn, Wrapper} from "./style";
// Assets
import DefaultImg from "../../assets/CaT_clear.png";

const OneCampsiteOnList = ({data}) => {

  const navigate = useNavigate();

  // 캠핑장 데이터 접근하기 쉽도록 가공
  let campsite = {};
  data.map((info) => {
    const Key = info.name;
    const Value = info.value;
    campsite[Key] = Value;
  })
  // console.log(campsite);

  const address = campsite.addr1 + " " + campsite.addr2;

  // 상세캠핑장 클릭
  const onClickDetail = () => {
    navigate(`/campsites/${campsite.contentId}`, {
      state: {
        data: {campsite}
      }
    })
  }

  return (
      <Wrapper>
        {(campsite.firstImageUrl)
            ? <MainImg src={campsite.firstImageUrl}
                       alt="대표이미지"
                       onClick={onClickDetail}/>
            : <MainImg src={DefaultImg} alt="디폴트 이미지" />
        }
        <ContentWrapper>
          <Content onClick={onClickDetail}>
            <div>
              <Name>{campsite.facltNm}</Name>
              <Intro>{campsite.lineIntro}</Intro>
            </div>
            <div>
              <Address>[{address}]</Address>
              <Induty>야영장구분 | {campsite.induty}</Induty>
            </div>
          </Content>
          <ReservBtn>
            예약하기
          </ReservBtn>
        </ContentWrapper>
      </Wrapper>
  )
}

export default OneCampsiteOnList;