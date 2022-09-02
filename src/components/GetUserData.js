import axios from "axios";
import preURL from "../preURL";
import {useCookies} from "react-cookie";

const GetUserData = async () => {

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  if(!cookies) return
  await axios
      .get(preURL + '/member/details', {
        headers: {
          Authorization : "Bearer "  + cookies
        }
      })
      .then((res) => {
        console.log("👍유저정보 받아오기 성공", res);
      })
      .catch((err) => {
        console.log("🧨유저정보 받아오기 실패", err);
      })
}

export default GetUserData;