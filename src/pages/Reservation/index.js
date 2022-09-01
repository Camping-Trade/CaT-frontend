import {useLocation, useParams} from "react-router-dom";

const Reservation = () => {
  const params = useParams();
  const location = useLocation();
  console.log(params);

  // 캠핑장 정보
  const Campsite = location.state.data.campsite;
  console.log(Campsite);

  return <div>예약 페이지</div>
}

export default Reservation;