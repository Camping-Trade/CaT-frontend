import styled from "styled-components";
import StyledBtn from "../../styles/StyledBtn";
import Color from "../../styles/Color";

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 80%;
  margin: 20px 0;
`

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  //width: 45%;
  height: fit-content;
  padding: 0 10px 10px;
  border: 3px solid ${Color.pointcolor};
  border-radius: 10px;

  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 0 0 0;
`

export const Title = styled.span`
  font-size: x-large;
  font-weight: bold;
  //margin-bottom: 0;
`

export const LeftInfo = styled.span`
  font-style: italic;
  display: inline-block;
  margin: 3px 0;
`

export const Map = styled.div`
  width: 100%;
  height: 300px;
  margin: 20px 0 10px;
  border: 1px solid;  // 임시
`

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 70%;
  padding: 0 20px;
`

export const ImgsWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 10px 0;
  
  & > img {
    width: 100%;
    object-fit: contain;
  }
`

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ShortComment = styled.div`
  margin: 10px;
  font-size: large;
  
  & > button {  // 더보기 버튼
    margin: 0 5px;
    color: gray;
    :hover {
      color: black;
    }
  }
`

export const LongComment = styled.div`
  display: ${props => props.show ? "block" : "none"};
  margin: 10px;
  font-style: italic;
`

export const GrayDetail = styled.div`
  color: #3F4254;
  margin: 10px;
`

// ====================== Review ======================== //
export const BottomTitle = styled.p`
  width: 80%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  font-size: xx-large;
`

export const BottomWrapper = styled.div`
  width: 80%;
`

export const ReviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`

export const ReviewCard = styled.div`
  height: fit-content;
  
  margin: 1%;
  padding: 10px;
  border: 2px solid ${Color.borderColor};
  border-radius: 10px;

  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
`

export const ReviewImgs = styled.div`
  width: 280px;
  height: 280px;
  
  border: 1px solid gainsboro;
  
  overflow-x: hidden;
  
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const ReviewInfo = styled.div`
  width: 280px;
  border: 1px solid transparent;
`

export const ReviewContent = styled.div`
  overflow-y: scroll;
  border: 1px solid gainsboro;
  padding: 2px;
  
  max-height: 120px;
`

export const WriterAndDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ReviewWriter = styled.p`
  font-size: small;
`

export const ReviewDate = styled.p`
  font-size: x-small;
`

export const DeleteBtn = styled(StyledBtn)`
  display: block;
  margin-left: auto;
`

export const NewCommentWrapper = styled.form`
  
`

export const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;

  border: 2px solid gainsboro;
  border-radius: 10px;
`

export const StarWrapper = styled.div`
  margin: 5px 0;
  
  & > select {
    margin: 0 5px;
    // 코드 중복 - 전체 캠핑장 페이지 검색
    border: 1px solid #c8c8c8;
    border-radius: 5px;
    box-shadow: 0 1px 3px -2px #9098A9;
    :focus {
      outline: none;
      border-color: ${Color.pointcolor};
    }
  }
`

export const UploadImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ImgInputLabel = styled.label`
  align-self: flex-start;
  
  box-sizing: border-box;
  
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.25rem;
  
  padding: 2rem;
  background-color: rgb(235,235,235);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;

  :hover {
    background-color: rgb(220,220,220);
  }
`

export const PreviewWrapper = styled.div`
  & > img {
    width: 80px;
    height: 100%;
    margin: 0 5px;
  }
`

export const TextAreaWrapper = styled.div`
  height: 150px;
  padding: 10px;
  border: 1px solid;
  margin: 10px 0;
  
  & > textarea {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    
    :focus {
      outline: none;
    }
  }
`

export const UploadBtn = styled(StyledBtn)`
  align-self: flex-end;
  
  border: 1px solid ${Color.borderColor};
  border-radius: .5rem;
  box-sizing: border-box;
  
  font-size: .875rem;
  font-weight: 600;
  line-height: 1.25rem;
  
  padding: .75rem 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;

  :hover {
    background-color: ${Color.pointcolor};
    color: white;
  }
`