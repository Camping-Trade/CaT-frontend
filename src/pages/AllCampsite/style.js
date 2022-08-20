import styled from "styled-components";
import StyledBtn from "../../styles/StyledBtn";
import Color from "../../styles/Color";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 100px 0;
  align-items: center;
`

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`

export const MapWrapper = styled.div`
  width: 500px;
  height: 500px;
`

export const SearchInputWrapper = styled.div`
  
`

export const Select = styled.select`
  width: 150px;
  position: relative;
  margin: 5px;
  padding: 7px 40px 7px 12px;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  box-shadow: 0 1px 3px -2px #9098A9;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  :focus {
    outline: none;
    border-color: ${Color.pointcolor};
  }
  & option {
    position: absolute;
    top: 0;
  }
`

export const SearchBtn = styled(StyledBtn)`
  font-size: 25px;
  vertical-align: middle;
  margin: 2px;
`

export const BottomWrapper = styled.div`
  width: 80%;
  margin: 50px 20px 0;
`

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const DefaultInform = styled.div`
  text-align: center;
  font-size: large;
`