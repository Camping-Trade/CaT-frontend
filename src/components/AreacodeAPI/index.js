import React from 'react';
import axios from "axios";

const AreacodeAPI = () => {

  const API_KEY = process.env.REACT_APP_AREACODE_API_KEY;
  const url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode";

  axios
      .get(url,{
        params: {
          ServiceKey: API_KEY,
          numOfRows: 10,
          pageNo: 1,
          MobileOS: "WIN",
          MobileApp: "CaT",
          areaCode: 1
        },
      })
      .then((res) => {
        console.log("👍지역코드 조회 api 호출 성공", res);
      })
      .catch((err) => {
        console.log("🧨지역코드 조회 api 호출 실패", err);
      })
}

export default AreacodeAPI;