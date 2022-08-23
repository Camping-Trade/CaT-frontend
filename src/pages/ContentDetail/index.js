import React, {useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import useInput from "../../hooks/useInput";
// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// Style
import {PageWrapper} from "../../styles/PageLayout";
import {
  BottomTitle,
  BottomWrapper, ImgInputLabel, ImgWrapper,
  NewCommentContainer,
  NewCommentWrapper, PreviewWrapper, StarWrapper,
  TextAreaWrapper,
  TopWrapper,
  UploadBtn
} from "./style";
import {BiImageAdd} from "react-icons/bi";

const ContentDetail = () => {
  const params = useParams();
  const location = useLocation();
  // console.log(params, location)

  // 후기 입력 내용
  const [content, onChangeContent, setContent] = useInput("");
  const [previewImg, setPreviewImg] = useState([]);


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


  return (
      <div>
        <Header />
        <PageWrapper>
          <TopWrapper>정보</TopWrapper>
          <BottomTitle>Review</BottomTitle>
          <BottomWrapper>
            <div>후기 리스트</div>

            {/* 후기 작성 */}
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
                <ImgWrapper>
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
                </ImgWrapper>
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