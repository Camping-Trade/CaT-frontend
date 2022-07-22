import React, {useState} from 'react';
import axios from "axios";

const AreacodeAPI = async (areacode) => {

  const API_KEY = process.env.REACT_APP_AREACODE_API_KEY;
  const url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode";

  // 지역코드로 조회한 지역 결과 리스트
  let areaItems = [];

  await axios
      .get(url,{
        params: {
          ServiceKey: API_KEY,
          numOfRows: 20,
          pageNo: 1,
          MobileOS: "WIN",
          MobileApp: "CaT",
          areaCode: areacode
        },
      })
      .then((res) => {
        console.log("👍지역코드 조회 api 호출 성공", res.data);
        areaItems = res.data.response.body.items['item'];
      })
      .catch((err) => {
        console.log("🧨지역코드 조회 api 호출 실패", err);
      })

  console.log(areaItems);

  return areaItems;
}

export default AreacodeAPI;