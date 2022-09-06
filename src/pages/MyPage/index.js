import axios from "axios";
import preURL from "../../preURL";
import {useCookies} from "react-cookie";

const MyPage = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  axios
      .get(preURL + '/member/reservations',{
        headers: {
          'Authorization': `Bearer ${cookies.appToken}`
        }
      })
      .then((res) => {
        console.log('👍유저 예약 정보 받아오기 성공', res);
      })
      .catch((err) => {
        console.log('🧨유저 예약 정보 받아오기 실패', err);
      })
}

export default MyPage;