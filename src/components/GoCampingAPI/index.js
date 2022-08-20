import React, {useState} from "react";
import axios from "axios";
import {parseXML} from "../XMLParser";

export const SpotBasedSearch = async (x, y, pageNo) => {

  const API_KEY = process.env.REACT_APP_GOCAMPING_API_KEY;
  const url = "http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/locationBasedList";

  // console.log("좌표: ", x, y);

  let data = [];
  let numOfRows, totalCount;

  await axios
      .get(url, {
        params: {
          ServiceKey: API_KEY,
          pageNo: pageNo,
          numOfRows: 15,
          MobileOS: "WIN",
          MobileApp: "CaT",
          mapX: x,  // ex
          mapY: y,   // ex
          radius: 20000
        }
      })
      .then((res) => {
        // const result = res.data.response.body.items.item;  // json
        data = parseXML(res.data)[1].children[0].children;
        numOfRows = parseXML(res.data)[1].children[1];
        // pageNo = parseXML(res.data)[1].children[2];
        totalCount = parseXML(res.data)[1].children[3]
        console.log("👍고캠핑 api 연결 성공\n", parseXML(res.data)[1].children);
      })
      .catch((err) => {
        console.log("🧨고캠핑 api 연결 실패\n", err);
      })

  return [data, numOfRows, totalCount];
};