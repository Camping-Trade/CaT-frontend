import styled from "styled-components";
import StyledBtn from "../../styles/StyledBtn";
import Color from "../../styles/Color";

export const ImgSlideWrapper = styled.div`
  width: 100%;
  height: 100vh;
  
  padding: 0;
  
  //position: relative;
  //overflow: hidden;
`

export const BgImg = styled.div`
  background-image: url(${props => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  height: 100%;

  //position: absolute;
  
  opacity: 0.5;
  object-fit: cover;
`

export const Title = styled.p`
  position: absolute;
  bottom: 50vh;
  width: 100%;
  
  text-align: center;
  font-size: 80px;
  font-weight: 600;
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  width: 100%;
  position: absolute;
  bottom: 45vh;
`

export const Btn = styled(StyledBtn)`
  align-items: center;
  background-color: ${Color.pointcolor};
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: black;
  
  cursor: pointer;
  max-width: 100%;
  padding: 10px 24px;
  
  font-size: x-large;
  font-weight: 600;
  letter-spacing: .25px;
  line-height: normal;
  text-align: center;
  
  //user-select: none;
  //-webkit-user-select: none;
  //touch-action: manipulation;

  :hover {
    background: white;
    color: ${Color.pointcolor};
  }

  :active {
    box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
    outline: none;
    background-color: ${Color.pointcolor};
    color: white;
  }
  
`

export const PhoneImg = styled.img`
  position: absolute;
  
  bottom: 0;
  width: 350px;
  right: 0;
  
  :hover {
    cursor: pointer;
  }
`