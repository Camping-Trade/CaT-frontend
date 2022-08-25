import React, {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import useInput from "../../hooks/useInput";
// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {KakaoMapMarker} from "../../components/MapAPI";
// Style
import {PageWrapper} from "../../styles/PageLayout";
import {
  BottomTitle,
  BottomWrapper,
  ImgInputLabel,
  UploadImgWrapper,
  NewCommentContainer,
  NewCommentWrapper,
  PreviewWrapper,
  ReviewCard,
  ReviewInfo,
  ReviewImgs,
  ReviewWrapper,
  ReviewWriter,
  StarWrapper,
  TextAreaWrapper,
  TopWrapper,
  UploadBtn,
  ReviewContent,
  LeftWrapper,
  Title,
  LeftInfo,
  Map,
  RightWrapper,
  ImgsWrapper,
  DetailWrapper,
  GrayDetail,
  ShortComment, LongComment
} from "./style";
import {BiImageAdd} from "react-icons/bi";
import {StyledAtag} from "../../styles/StyledLink";
import Color from "../../styles/Color";
import StyledBtn from "../../styles/StyledBtn";


const ContentDetail = () => {
  const params = useParams();
  const location = useLocation();
  console.log(params, location)

  // 캠핑장 정보
  const Campsite = location.state.data.campsite;
  // console.log(Campsite);


  // 후기 입력 내용
  const [content, onChangeContent, setContent] = useInput("");
  const [previewImg, setPreviewImg] = useState([]);

  // 후기 목록
  const [reviews, setReviews] = useState([
    {name: "사용자1", content: "여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요", star: 5, imgUrl:
          ["https://blog.kakaocdn.net/dn/xxyIJ/btq92x3CGjB/Yc203QOlRmjDO2rjKC4TDK/img.jpg",
            "https://img.hankyung.com/photo/202111/AA.28096233.1.jpg"]},
    {name: "사용자2", content: "여기 별로에요ㅜ", star: 1, imgUrl: []},
    {name: "사용자3", content: "좋아용", star: 3, imgUrl: []},
    {name: "사용자4", content: "good", star: 4, imgUrl: []},
  ])


  // 카카오맵 불러오기
  useEffect(() => {
    KakaoMapMarker(Campsite.mapY, Campsite.mapX, Campsite.facltNm);
  },[Campsite.mapY, Campsite.mapX, Campsite.facltNm]);


  // 이미지 업로드
  const onChangeImgInput = (e) => {
    const list = Array.from(e.target.files);  // 유사배열을 배열로 변환 => map함수 처리 위해

    let arr = [];
    list.forEach((img) => {
      const reader = new FileReader();
      reader.onload = () => {
        arr.push(reader.result);
        setPreviewImg([...arr]);
      }
      reader.readAsDataURL(img);
    })
  }

  const [showLongComment, setShowLongComment] = useState(false);
  const onClickLongComment = () => {
    setShowLongComment(prev => !prev);
  }


  // 리뷰 목록 show
  const ShowReviews = reviews.map((review, index) => {
    return (
        <ReviewCard key={index}>
          {review.imgUrl &&
              <ReviewImgs>
                {(review.imgUrl).map((url, idx) => {
                  return <img src={url} key={idx}/>
                })}
              </ReviewImgs>
          }
          <ReviewInfo>
            <p>★: {review.star}</p>
            <ReviewContent>{review.content}</ReviewContent>
            <ReviewWriter>{review.name}</ReviewWriter>
          </ReviewInfo>
        </ReviewCard>
    )
  })


  return (
      <div>
        <Header />
        <PageWrapper>

          {/* 상세 캠핑장 정보 */}
          <TopWrapper>
            <LeftWrapper>
              <Title>{Campsite.facltNm}</Title>
              {/* 이미지 */}
              <ImgsWrapper>
                <StyledBtn>◀ ︎prev</StyledBtn>
                <img src={Campsite.firstImageUrl} alt="대표이미지" />
                <StyledBtn>next ▶︎</StyledBtn>
              </ImgsWrapper>

              <LeftInfo>주소: {Campsite.addr1} {Campsite.addr2}</LeftInfo>
              <LeftInfo>Tel: {Campsite.tel}</LeftInfo>
              <StyledAtag
                  color="gray"
                  hover={Color.pointcolor}
                  href={Campsite.homepage}>
                홈페이지 바로가기
              </StyledAtag>
              <Map id="kakao-map" />
              <div>{Campsite.direction}</div>
            </LeftWrapper>

            <RightWrapper>
              {/* 캠핑장 디테일 정보 */}
              <DetailWrapper>
                <ShortComment>
                  "{Campsite.lineIntro}"
                  <StyledBtn onClick={onClickLongComment}>더보기</StyledBtn>
                </ShortComment>
                <LongComment show={showLongComment}>{Campsite.intro}</LongComment>
                <GrayDetail>
                  <br/>
                  ☐ 업종
                  <br />
                  {Campsite.induty}
                  <br />
                  ☐ 입지 구분
                  <br />
                  {Campsite.lctCl}
                  <br/>
                  ☐ 테마 환경
                  <br/>
                  {Campsite.themaEnvrnCl}
                  <br/><br/>

                  [운영 안내]
                  <br/>
                  {Campsite.operPdCl} / {Campsite.operDeCl}
                  <br/><br/>

                  [야영장 안내]
                  <br/>
                  일반야영장: {Campsite.gnrlSiteCo} <br/>
                  자동차야영장: {Campsite.autoSiteCo} <br/>
                  글램핑: {Campsite.glampSiteCo} (내부시설: {Campsite.glampInnerFclty}) <br/>
                  카라반: {Campsite.caravSiteCo} (내부시설: {Campsite.caravInnerFclty}) <br/>
                  개인카라반: {Campsite.indvdlCaravSiteCo} <br/>
                  파쇄석: {Campsite.siteBottomCl2} <br/>
                  잔디: {Campsite.siteBottomCl1} <br/>
                  테크: {Campsite.siteBottomCl3} <br/>
                  자갈: {Campsite.siteBottomCl4} <br/>
                  맨흙: {Campsite.siteBottomCl5}
                  <br/><br/>

                  [시설 안내]
                  <br/>
                  화장실: {Campsite.toiletCo}개 <br/>
                  샤워실: {Campsite.swrmCo}개 <br/>
                  개수대: {Campsite.wtrplCo}개 <br/>
                  화로대: {Campsite.brazierCl} <br/>
                  부대시설: {Campsite.sbrsCl} <br/>
                  기타: {Campsite.sbrsEtc}
                  <br/><br/>

                  [기타 시설 안내]
                  <br/>
                  주변 이용 가능 시설: {Campsite.posblFcltyCl} <br/>
                  {Campsite.posblFcltyEtc   // 기타 주변 이용 가능 시설 여부
                      ? (
                          <>
                            주변 이용 가능 시설 기타: {Campsite.posblFcltyEtc} <br/>
                          </>
                      )
                      :
                        ""
                  }
                  {Campsite.clturEventAt !== "N"    // 자체 문화 행사 여부
                      ? (
                          <>
                            자체 문화 행사명: {Campsite.clturEvent} <br/>
                          </>
                      )
                      : (
                          <>
                            자체 문화 행사 없음 <br/>
                          </>
                      )
                  }
                  {Campsite.exprnProgrmAt !== "N"   // 체험 프로그램 여부
                      ? (
                          <>
                            체험 프로그램명: {Campsite.exprnProgrm} <br/>
                          </>
                      )
                      : (
                          <>
                            체험 프로그램 없음 <br/>
                          </>
                      )}
                  <br/><br/>

                  [기타]
                  <br/>
                  개인 트레일러: 동반 {Campsite.trlerAcmpnyAt === "Y" ? "가능" : "불가능"} <br/>
                  개인 카라반: 동반 {Campsite.caravAcmpnyAt === "Y" ? "가능" : "불가능"} <br/>
                  캠핑 장비 대여: {Campsite.eqpmnLendCl} <br/>
                  애완 동물 출입: {Campsite.animalCmgCl}
                  <br/><br/>

                  [예약 안내]
                  <br/>
                  {Campsite.resveCl}
                  <br/>
                  휴뮤: {Campsite.hvofBgnde} ~ {Campsite.hvofEnddle}
                  <br/>
                  <StyledAtag
                      href={Campsite.resveUrl}
                      color="#3F4254"
                      hover="black"
                  >
                    ☞ 캠핑장 예약페이지 바로가기
                  </StyledAtag>
                  <br/><br/>
                </GrayDetail>
              </DetailWrapper>
            </RightWrapper>
          </TopWrapper>

          {/* 리뷰 */}
          <BottomTitle>Review</BottomTitle>

          <BottomWrapper>

            {/* 리뷰 목록 */}
            <ReviewWrapper>
              {ShowReviews}
            </ReviewWrapper>

            {/* 리뷰 작성 */}
            <NewCommentWrapper>
              <p>{'사용자 닉네임'}</p>  {/*로그인 정보 받아오기*/}
              <NewCommentContainer>
                <StarWrapper>
                  ★:
                  <select>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                </StarWrapper>
                <UploadImgWrapper>
                  {/* 이미지 선택 */}
                  <ImgInputLabel htmlFor="img-input">
                    <BiImageAdd />
                  </ImgInputLabel>
                  <input
                      id="img-input"
                      type="file"
                      accept="image/*"
                      onChange={onChangeImgInput}
                      multiple
                      style={{display: "none"}}/>
                  <PreviewWrapper>
                    {previewImg.map((url, index) => {
                      return <img src={url} key={index}/>
                    })}
                  </PreviewWrapper>
                </UploadImgWrapper>
                {/* 내용 입력 */}
                <TextAreaWrapper>
                  <textarea
                      value={content}
                      onChange={onChangeContent}
                      placeholder="후기를 남겨주세요."/>
                </TextAreaWrapper>
                {/* 업로드 클릭 */}
                <UploadBtn>Upload</UploadBtn>
              </NewCommentContainer>
            </NewCommentWrapper>

          </BottomWrapper>
        </PageWrapper>
        <Footer />
      </div>
  )
}

export default ContentDetail;