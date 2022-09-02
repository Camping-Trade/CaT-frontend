import axios from "axios";
import preURL from "../preURL";

const GetUserData = async (appToken) => {

  let data = [];

  if(!appToken) return
  await axios
      .get(preURL + '/member/details', {
        headers: {
          Authorization : "Bearer "  + appToken
        }
      })
      .then((res) => {
        console.log("👍유저정보 받아오기 성공", res.data);
        data = res.data;
      })
      .catch((err) => {
        console.log("🧨유저정보 받아오기 실패", err);
      })

  return data;
}

export default GetUserData;