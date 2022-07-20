import React, {useEffect, useState} from "react";

const {kakao} = window;
let map;

export const KakaoMapAPI = () => {
  console.log("👍카카오맵 api 연결");

  const container = document.getElementById('kakao-map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };
  map = new kakao.maps.Map(container, options);
};


export const KakaoSpotBasedSearch = async () => {

  console.log("👍카카오 주소 검색 연결");

  const [mapX, setMapX] = useState(37.4917882876857);
  const [mapY, setMapY] = useState(127.487578470072);

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch('전라도 전주', await function(result, status) {

    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      // console.log(result);
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      setMapX(Number(result[0].y));
      setMapY(Number(result[0].x));
      console.log("result[0]: ", result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });

  return [mapY, mapX];
}