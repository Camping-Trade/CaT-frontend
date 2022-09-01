import styled from "styled-components";
import Color from "../../styles/Color";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 55px;
  right: 4%;

  border: 2px solid ${Color.pointcolor};
  border-radius: 5px;
  background-color: white;

  & > button {
    padding: 10px;
    color: #545454;
    font-size: 15px;
  }

  :after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${Color.pointcolor};
    content: '';
    position: absolute;
    top: -10px;
    right: 10%;
  }
`

export const Line = styled.div`
  border-top: 0.5px solid gray;
  width: 80%;
  align-self: center;
`