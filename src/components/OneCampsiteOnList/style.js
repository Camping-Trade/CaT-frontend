import styled from "styled-components";
import StyledBtn from "../../styles/StyledBtn";
import Color from "../../styles/Color";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 20px;
  padding: 10px 10px 10px 0;
  border: 3px solid ${Color.borderColor};
  border-radius: 10px;
  box-shadow: ${Color.cardBoxShadow};

  :hover{
    transform:scale(1.1);
    transition: transform .35s;
    z-index: 2;
  }
`

export const MainImg = styled.img`
  width: 25%;
  margin: 0 20px;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 75%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  margin: 10px;
  
  cursor: pointer;
`

export const Name = styled.span`
  display: block;
  
  font-weight: bold;
  font-size: large;
  
  margin: 0 0 10px;
`

export const Intro = styled.span`
  font-style: italic;
`

export const Address = styled.span`
  display: block;
`

export const Induty = styled.span`
  font-size: small;
`

export const ReservBtn = styled(StyledBtn)`
  font-size: large;
  font-weight: bold;
`