import styled from "styled-components";

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  margin: 40px auto 0;
`

export const ProfileImg = styled.img`
  width: 250px;
  height: 250px;

  border-radius: 50%;
  object-fit: cover;
`

export const InfoWrapper = styled.div`
  margin-top: 20px;
`

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 60%;
  margin: 20px 20px 0;
`

export const PointWrapper = styled.div`
  width: fit-content;
`

export const PointTitle = styled.p`
  font-size: x-large;
  font-weight: 600;
  border-bottom: 1px solid;
  
  width: fit-content;
`

export const UserPoint = styled.span`
  font-size: large;
`

export const RecordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 40px;
`

export const Record = styled.div`
  width: 40%;
  
  & > p {
    text-align: center;
    font-size: large;
    font-weight: 600;
    border-bottom: 1px solid gray;
  }
`

export const OneTrade = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 20px 0;
`

export const OneTradeInfo = styled.div`
  & > span {
    font-size: small;
  }
`

export const TradeType = styled.p`
  font-size: large;
  margin: 0;
`

export const OneReserv = styled.div`
  margin: 20px 0;
  
  & > span {
    display: block;
  }
`

export const ReservCampingName = styled.span`
  font-weight: 600;
`

export const ReservDetail = styled.span`
  font-size: small;
`