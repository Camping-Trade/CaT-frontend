import styled from "styled-components";
import StyledBtn from "../../styles/StyledBtn";
import Color from "../../styles/Color";

export const TopWrapper = styled.div`
  width: 80%;
`

export const BottomTitle = styled.p`
  width: 80%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  font-size: xx-large;
`

export const BottomWrapper = styled.div`
  width: 80%;
`

export const NewCommentWrapper = styled.div`
  
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
  }
`

export const ImgWrapper = styled.div`
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