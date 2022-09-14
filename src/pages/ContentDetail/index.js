import React, {useCallback, useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import useInput from "../../hooks/useInput";
import axios from "axios";
// import preURL from "../../preURL";
// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {KakaoMapMarker} from "../../components/PublicAPI/MapAPI";
import GetUserData from "../../components/GetUserData";
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
  ShortComment, LongComment, TitleWrapper, ReviewDate, WriterAndDate, DeleteBtn
} from "./style";
import {BiImageAdd} from "react-icons/bi";
import {StyledAtag} from "../../styles/StyledLink";
import Color from "../../styles/Color";
import StyledBtn from "../../styles/StyledBtn";


const ContentDetail = () => {
  const params = useParams();
  const location = useLocation();
  // console.log(params, location)

  const preURL = process.env.REACT_APP_PREURL;

  const navigate = useNavigate();

  // 캠핑장 정보
  const Campsite = location.state.data.campsite;
  // console.log(Campsite);

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  // 사용자 닉네임
  const [nickname, setNickname] = useState("");

  // 후기 입력 내용
  const [star, onChangeStar, setStar] = useInput(5);
  const [content, onChangeContent, setContent] = useInput("");
  const [newImages, setNewImages] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  // 후기 목록
  const [reviews, setReviews] = useState([
    // {writer: "사용자1", content: "여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요 여기 캠핑장 짱짱 좋아요 풍경이 이뻐요 경치가 좋아요", rating: 5, createdDate: "22. 9. 6. 오전 1:48", images:
    //       ["https://blog.kakaocdn.net/dn/xxyIJ/btq92x3CGjB/Yc203QOlRmjDO2rjKC4TDK/img.jpg",
    //         "https://img.hankyung.com/photo/202111/AA.28096233.1.jpg"]},
    // {writer: "사용자2", content: "여기 별로에요ㅜ", rating: 1, createdDate: "22. 9. 6. 오전 1:48", images: []},
    // {writer: "사용자3", content: "좋아용", rating: 3, createdDate: "22. 9. 6. 오전 1:48", images: []},
    // {writer: "사용자4", content: "good", rating: 4, createdDate: "22. 9. 6. 오전 1:48", images: []},
  ])


  // 카카오맵 불러오기
  useEffect(() => {
    KakaoMapMarker(Campsite.mapY, Campsite.mapX, Campsite.facltNm);
  },[Campsite.mapY, Campsite.mapX, Campsite.facltNm]);


  // 유저 정보 받아오기
  useEffect(() => {
    cookies.appToken && GetUserData(cookies.appToken)
        .then((res) => {
          // console.log("👍유저데이터 프로미스 반환", res);
          setNickname(res.nickname);
        })
        .catch((err) => {
          // console.log("🧨유저데이터 프로미스 반환 에러", err)
        })
  },[cookies.appToken]);


  // 리뷰 목록 받아오기
  useEffect(() => {
    axios
        .get(preURL + `/camping/details/${Campsite.contentId}/reviews`, {
          // headers: {
          //   'Authorization': 'Bearer ' + cookies.appToken
          // }
        })
        .then((res) => {
          // console.log("👍리뷰 목록 받아오기 성공", res);
          setReviews(res.data);
        })
        .catch((err) => {
          // console.log("🧨리뷰 목록 받아오기 실패", err);
        })
  },[]);


  // 이미지 업로드
  const onChangeImgInput = (e) => {
    const files = e.target.files;
    console.log("files: ", files);

    // 이미지 넘길 value
    setNewImages(files);

    // 이미지 미리보기 설정
    const list = Array.from(files);  // 유사배열을 배열로 변환 => map함수 처리 위해
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

  // 캠핑장 긴 코멘트 펼치기
  const [showLongComment, setShowLongComment] = useState(false);
  const onClickLongComment = () => {
    setShowLongComment(prev => !prev);
  }

  // 예약하기 클릭
  const onClickReservation = () => {
    if(!cookies.appToken) {
      alert("로그인 후 이용해주세요.");
      return
    }
    navigate(`/reservation/${params.id}`, {
      state: {
        data: location.state.data
      }
    })
  }

  // 리뷰 업로드
  const onSubmitUpload = useCallback(async (e) => {
    e.preventDefault();
    if(!content) {
      alert('내용을 입력해주세요.');
      e.preventDefault();
      return
    }

    const upload = window.confirm('리뷰를 업로드하시겠습니까?');
    if(!upload) return

    const formData = new FormData();
    const variables = {
      content: content,
      rating: star
    }
    formData.append('reviewRequestDto', new Blob([JSON.stringify(variables)], {type: "application/json"}));

    for(let i=0; i<newImages.length; i++) {
      console.log("newImages:", newImages[i]);
      formData.append('images', newImages[i]);
    }

    await axios
        .post(preURL + `/camping/details/${Campsite.contentId}/reviews`,
            formData,
            {
              headers: {
                'Authorization': 'Bearer ' + cookies.appToken,
                'Content-Type': 'multipart/form-data'
              }
            }
        )
        .then((res) => {
          // console.log("👍리뷰 업로드 성공", res);
          alert('리뷰를 업로드했습니다!');
          setContent("");
          setStar(0);
          setNewImages("");
          window.location.reload();
        })
        .catch((err) => {
          // console.log("🧨리뷰 업로드 실패", err);
        })

    // for (let value of formData.values()) {
    //   console.log(value);
    // }

  },[content, star, newImages]);


  // 리뷰 삭제
  const onClickDelete = async (e) => {
    // console.log(e);
    const del = window.confirm('리뷰를 삭제하시겠습니까?');
    if(!del) return

    const reviewId = e.target.id;
    await axios
        .delete(preURL + `/camping/details/${Campsite.contentId}/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${cookies.appToken}`
          }
        })
        .then((res) => {
          // console.log("👍리뷰 삭제 성공", res);
          alert('리뷰를 삭제하였습니다.');
          window.location.reload();
        })
        .catch((err) => {
          // console.log("🧨리뷰 삭제 실패", err);
        })
  }



  // 리뷰 목록 show
  const ShowReviews = reviews.map((review, index) => {
    return (
        <ReviewCard key={index}>
          {review.images[0] !== "" &&   // 사진이 있으면
              <ReviewImgs>
                {(review.images).map((url, idx) => {
                  return <img src={url} key={idx}/>
                })}
              </ReviewImgs>
          }
          <ReviewInfo>
            <p>★: {review.rating}</p>
            <ReviewContent>{review.content}</ReviewContent>
            <WriterAndDate>
              <ReviewWriter>{review.writer}</ReviewWriter>
              <ReviewDate>{review.createdDate}</ReviewDate>
            </WriterAndDate>
            {nickname === review.writer   // 로그인한 사용자와 리뷰 작성자가 동일하면
                && <DeleteBtn id={review.reviewId} onClick={onClickDelete}>삭제</DeleteBtn>}
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
              <TitleWrapper>
                <Title>{Campsite.facltNm}</Title>
                <StyledBtn onClick={onClickReservation}>예약하기</StyledBtn>
              </TitleWrapper>
              {/* 이미지 */}
              <ImgsWrapper>
                <img src={Campsite.firstImageUrl} alt="대표이미지" />
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
            <NewCommentWrapper enctype="multipart/form-data" onSubmit={onSubmitUpload}>
              <p>{nickname}</p>
              <NewCommentContainer>
                <StarWrapper>
                  ★:
                  <select value={star} onChange={onChangeStar}>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
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
                  {cookies.appToken
                      ? (
                          <textarea
                              value={content}
                              onChange={onChangeContent}
                              placeholder="후기를 남겨주세요."/>
                      ) : (
                          <textarea
                              value={content}
                              onChange={onChangeContent}
                              placeholder="로그인 후 이용해주세요."
                              disabled/>
                      )}

                </TextAreaWrapper>
                {/* 업로드 클릭 */}
                <UploadBtn type="submit">Upload</UploadBtn>
              </NewCommentContainer>
            </NewCommentWrapper>

          </BottomWrapper>
        </PageWrapper>
        <Footer />
      </div>
  )
}

export default ContentDetail;