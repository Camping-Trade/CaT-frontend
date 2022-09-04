import styled from "styled-components";
import Color from "../../styles/Color";
import StyledBtn from "../../styles/StyledBtn";

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 40%;
  margin-top: 20px;
  padding: 20px;
`

export const InfoWrapper = styled.div`
  display: flex;
  
  width: 90%;
  padding: 10px;
`

export const MainImg = styled.img`
  width: 50%;
`

export const Map = styled.div`
  width: 90%;
  height: 350px;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 0 10px;
  
  font-size: small;
`

export const OneInfo = styled.div`
  padding: 3px;
`

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  padding: 20px;
`

export const Name = styled.p`
  font-size: x-large;
  font-weight: 600;
  
  cursor: pointer;
`

export const SelectDateWrapper = styled.div`
  display: flex;
  margin: 20px 0;
`

export const CalendarWrapper = styled.div`
  width: 300px;
  height: 300px;
`

export const Input = styled.input`
  width: 110px;
  position: relative;
  padding: 7px 12px;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  box-shadow: 0 1px 3px -2px #9098A9;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  
  :focus {
    outline: none;
    border-color: ${Color.pointcolor};
  }
`

export const PointWrapper = styled.div`
  margin: 20px 0;
`

export const Warning = styled.span`
  display: ${props => props.display || 'none'};
  margin: 3px 0;
  font-size: small;
  color: red;
`

export const SubmitBtn = styled(StyledBtn)`
  width: fit-content;
  align-self: flex-end;

  background-color: ${Color.pointcolor};
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;

  :hover {
    background-color: #17b01e;
  }
`