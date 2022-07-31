import React, {useState} from "react";
import axios from "axios";

export const SpotBasedSearch = async (x,y) => {

  const API_KEY = process.env.REACT_APP_GOCAMPING_API_KEY;
  const url = "http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/locationBasedList";

  let data;
  await axios
      .get(url, {
        params: {
          ServiceKey: API_KEY,
          // pageNo: 1,
          // numOfRows: 10,
          MobileOS: "WIN",
          MobileApp: "CaT",
          mapX: x,  // ex
          mapY: y,   // ex
          radius: 10000
        }
      })
      .then((res) => {
        const result = res.data.response.body.items.item;
        console.log("👍고캠핑 api 연결 성공\n", res.data.response.body);
        data = result;
        console.log(x,y);
      })
      .catch((err) => {
        console.log("🧨고캠핑 api 연결 실패\n", err);
      })

  return data;
};