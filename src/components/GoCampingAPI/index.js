import React, {useEffect} from "react";
import axios from "axios";

export const SpotBasedSearch = (x,y) => {

  const API_KEY = process.env.REACT_APP_GOCAMPING_API_KEY;
  const url = "http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/locationBasedList";


  axios
      .get(url, {
        params: {
          ServiceKey: API_KEY,
          // pageNo: 1,
          // numOfRows: 10,
          MobileOS: "WIN",
          MobileApp: "CaT",
          mapX: x,  // ex
          mapY: y,   // ex
          radius: 2000
        }
      })
      .then((res) => {
        console.log("👍고캠핑 api 연결 성공\n", res);
        console.log(x,y);
      })
      .catch((err) => {
        console.log("🧨고캠핑 api 연결 실패\n", err);
      })

};