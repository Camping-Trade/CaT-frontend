import axios from "axios";
import {parseXML} from "../../XMLParser";

const TourPicsAPI = async () => {

  const API_KEY = process.env.REACT_APP_TOURPICS_API_KEY;

  let items = [];

  await axios
      .get("http://api.visitkorea.or.kr/openapi/service/rest/PhotoGalleryService/galleryList",{
        params: {
          numOfRows: 30,
          pageNo: 1,
          MobileOS: "WIN",
          MobileApp: "CaT",
          ServiceKey: API_KEY,
          // _type:
          arrange: "A"
        }
      })
      .then((res) => {
        const data = parseXML(res.data);
        console.log("👍관광사진 api 호출 성공", data);
        items = data[1].children[0].children;
      })
      .catch((err) => {
        console.log("🧨관광사진 api 호출 실패", err);
      })


  return items
}

export default TourPicsAPI;