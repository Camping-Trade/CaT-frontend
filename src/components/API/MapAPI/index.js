import React from "react";

const {kakao} = window;
let map;

// ================= 카카오맵 불러오기 =================
/*
  export const KakaoMapAPI = () => {
  console.log("👍카카오맵 api 연결 성공");

  const container = document.getElementById('kakao-map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };
  map = new kakao.maps.MapAPI(container, options);
};
*/

// ================= 카카오맵에 좌표 찍기 =================

export const KakaoMapMarker = (x, y, name) => {
  console.log("👍카카오맵 api 연결 성공");

  const container = document.getElementById('kakao-map');
  const options = {
    center: new kakao.maps.LatLng(x, y), // 지도의 중심좌표
    level: 3
  };
  map = new kakao.maps.Map(container, options);

  console.log("👍카카오맵에 좌표 마커 표시 성공, ", x, y);

  // 마커가 표시될 위치입니다
  const markerPosition  = new kakao.maps.LatLng(x, y);

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null);

  // ================= 인포윈도우 =================

  const LargeMapHref = `https://map.kakao.com/link/map/${name},${x},${y}`,
      ToHref = `https://map.kakao.com/link/to/${name},${x},${y}`;

  const iwContent = `
          <div style="padding:5px;">
            ${name} <br />
            <a href=${LargeMapHref} style="color:blue" target="_blank">
                큰지도보기
            </a>
            <a href=${ToHref} style="color:blue" target="_blank">
                길찾기
            </a>
          </div> `,
      iwPosition = new kakao.maps.LatLng(x, y); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({
    position : iwPosition,
    content : iwContent
  });

// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker);
}
