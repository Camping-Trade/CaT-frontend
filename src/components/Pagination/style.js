import styled from "styled-components";
import StyledBtn from "../../styles/StyledBtn";
import Color from "../../styles/Color";

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Pages = styled.div`
  display: flex;
  flex-direction: row;
`

export const PageNum = styled(StyledBtn)`
  font-size: 20px;
  padding: 10px;
  color: ${props => props.check ? Color.pointcolor : "none"};
  border-radius: 50%;
`

export const MoveBtn = styled(StyledBtn)`
  padding: 5px;
`