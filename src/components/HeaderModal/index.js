import {Line, ModalWrapper} from "./style";
import StyledBtn from "../../styles/StyledBtn";

const HeaderModal = ({show}) => {

  if(!show) return
  return (
      <ModalWrapper>
        <StyledBtn>마이페이지</StyledBtn>
        <Line></Line>
        <StyledBtn>로그아웃</StyledBtn>
      </ModalWrapper>
  )
}

export default HeaderModal;